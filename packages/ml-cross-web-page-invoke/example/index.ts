import { CrossWebPageInvoke } from '../src'

const query = window.location.search.substring(1).split('&').reduce((pre, cur) => {
  const p = cur.split('=');
  return { ...pre, ...{ [p?.[0]]: p?.[1] } }
}, {})

const event = query['event'] || 'event';
const listen = query['listen'] || 'event';
console.log(event, listen)

const el = document.querySelector('#btn')

el.innerHTML = `Send ${event}`
el.addEventListener('click', () => {
  console.log('click', event)
  CrossWebPageInvoke.send(event, `send ${event}`)
})

CrossWebPageInvoke.on(listen, (message, event) => {
  console.log(listen, message, event)
})


