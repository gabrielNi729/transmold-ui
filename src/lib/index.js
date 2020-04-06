import ExpressionAtom from './clause/atom/index.js'
import ExpressionNote from './explain/note/index.js'


const components = [ExpressionAtom, ExpressionNote];

const install = function (vue) {

  if (install.installed) return;
  components.map((component) => {
    vue.component(component.name, component);
  });

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  ExpressionAtom,
  ExpressionNote
}
