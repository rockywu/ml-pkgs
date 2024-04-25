export * from './interface';

export default {
  test: (a: number) => {
    if(a === 2) {
      console.log(33);
    }
    const c = {
      a: 1,
      b: 2
    };
    console.log(c);
    console.log('test');
  }
};

