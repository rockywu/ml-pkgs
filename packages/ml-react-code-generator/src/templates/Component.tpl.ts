
/**
 * 组件模板代码
 */
export const ComponentTpl = () => {
  return`
    <{{component.name}} >
    {{#if person.bool}}
      <img src="star.gif" alt="Active">
    {{/if}}
    </{{component.name}}>
  `;
};


import Handlebars from 'handlebars';
// eslint-disable-next-line no-undef
const template = Handlebars.compile(ComponentTpl());
console.log(template(
  {
    component: {
      name: 'Button',
      children: 'Click me!'
    },
    person: {
      bool: true,
      firstname: 'Yehuda',
      lastname: 'Katz'
    }
  }
));


