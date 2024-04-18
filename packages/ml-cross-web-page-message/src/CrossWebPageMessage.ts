import { ICrossHander, ReceiveFunction } from "./interface";
import EventEmitter from 'eventemitter3'
//eventemitter3 todo 尝试依赖事情管理器

/**
 * 跨网页通讯
 * 本插件使用
 * BroadcastChannel 、 LocalStorage 和 SessionStorage 两类进行跨网页通讯
 */
const DEFAULT_CHANNEL_KEY = 'ml-cross-web-page-message'

export class CrossHander implements ICrossHander {

  private broadcastChannel: BroadcastChannel = null;

  private storeChannel: typeof window.localStorage | typeof window.sessionStorage = null;

  constructor(public channelKey: string = DEFAULT_CHANNEL_KEY) {
    if (typeof window.BroadcastChannel === 'function') {
      this.broadcastChannel = new BroadcastChannel(channelKey);
    } else if (typeof window.localStorage === 'object') {
      this.storeChannel = window.localStorage;
    } else if (typeof window.sessionStorage === 'object') {
      this.storeChannel = window.sessionStorage;
    }
  }
  send(message: string): void {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(message);
    } else if (this.storeChannel) {
      this.storeChannel.setItem(this.channelKey, message);
    } else {
      throw new Error('当前环境不支持 BroadcastChannel 、 LocalStorage 和 SessionStorage 两类进行跨网页通讯')
    }
  }

  /**
   * 连接器
   */
  attach(callback: ReceiveFunction) {
    const broadcastChannel = this.broadcastChannel;
    const emitCallback = (channelData: string) => {
      try {
        const { type, message } = JSON.parse(channelData)
        callback(type, message)
      } catch (e) {
        console.log('CrossHander-emitCallback', e);
      }
    }
    if (broadcastChannel) {
      broadcastChannel.onmessage = (event) => {
        emitCallback(event.data)
      };
    } else if (this.storeChannel) {
      window.addEventListener('storage', (event) => {
        if (event.key === this.channelKey) {
          emitCallback(event.newValue)
        }
      });
    }
  }
}

export class CrossWebPageMessageFactory extends EventEmitter {

  private crossHander: ICrossHander = null;

  constructor(public channelKey: string = DEFAULT_CHANNEL_KEY, crossHander?: ICrossHander) {
    super();
    if (crossHander) {
      this.crossHander = crossHander;
    } else {
      this.crossHander = new CrossHander(channelKey);
    }
    // 执行程序连接器,只要作用是绑定监听事件
    this.crossHander.attach((type, message) => {
      this.emit(type, { type, message });
    });
  }

  /**
   * 发送消息
   * @param type 
   * @param message 
   */
  send(type: string, message: any) {
    /**
     * 将数据序列号,转为普通对象。由于页面间无法访问函数，所以需要序列化。
     */
    const data = JSON.stringify({ type, message })
    this.crossHander.send(data);
  }

  receive(type: string, callback: (type: string, message: any) => void, context?: any) {
    this.on(type, callback, context)
  }
}

/**
 * 创建一个基础对象
 */
export const CrossWebPageMessage = new CrossWebPageMessageFactory(DEFAULT_CHANNEL_KEY)