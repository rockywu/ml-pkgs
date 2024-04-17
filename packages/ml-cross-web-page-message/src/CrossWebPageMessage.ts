/**
 * 跨网页通讯
 * 本插件使用
 * BroadcastChannel 、 LocalStorage 和 SessionStorage 两类进行跨网页通讯
 */
// const Broadcast_Channel_Key = 'ml-cross-web-page-message'
//判断使用场景
function getScene(): string | null {
  if (typeof window.BroadcastChannel === 'function') {
    return 'BroadcastChannel'
  } else if (typeof window.localStorage === 'object' || typeof window.sessionStorage === 'object') {
    return 'Store'
  }
  return null;
}

/**
 * 判断工作环境
 */
const currentScene = getScene();


export class CrossWebPageMessage {
  static sendMessage(type: string, msg: any) {
    if (!currentScene) {
      throw new Error('当前环境不支持 BroadcastChannel 、 LocalStorage 和 SessionStorage 两类进行跨网页通讯')
    }
    /**
     * 将数据序列号,转为普通对象。由于页面间无法访问函数，所以需要序列化。
     */
    const message = JSON.stringify({
      type,
      msg
    })
    console.log('message', message, Broadcast_Channel_Key)
  }

  static receiveMessage(callback: (type: string, message: any) => void) {
    if (!currentScene) {
      throw new Error('当前环境不支持 BroadcastChannel 、 LocalStorage 和 SessionStorage 两类进行跨网页通讯')
    }
    console.log('callback', callback)
  }



// }

// export const CrossWebPageMessage = {
//   /**
//    * 跨网页通讯
//    * @param message
//    */
//   sendMessage(message: any) {
//     const channel = new BroadcastChannel(Broadcast_Channel_Key)
//     channel.postMessage(message)
//   },
//   /**
//    * 跨网页通讯
//    * @param message
//    */
//   receiveMessage(callback: (message: any) => void) {
//     constchannel = new BroadcastChannel(Broadcast_Channel_Key)
// }
// }



