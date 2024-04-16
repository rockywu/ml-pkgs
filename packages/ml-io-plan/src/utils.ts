
/**
 * 等待延迟
 * @param ms 
 * @returns 
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}