/**
 * 异步函数
 */

/**
 * 等待延迟
 * @param ms 毫秒
 * @returns 
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
