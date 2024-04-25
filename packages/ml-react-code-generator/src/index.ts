import Handlebars from 'handlebars';

const template = Handlebars.compile('Name: {{name}}');
console.log(template({ name: '张三' }));