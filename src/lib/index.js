import TransmoldAtom from './clause/atom/index.js'
import TransmoldNote from './explain/note/index.js'
import { OP, Operators, Types, DATUM, Metadata, Instance, Template, Parameter, Table, Field, Enum, i18n } from 'transmold'

const components = [TransmoldAtom, TransmoldNote];

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
  TransmoldAtom,
  TransmoldNote,
  OP,
  Operators,
  Types,
  DATUM,
  Metadata,
  Instance,
  Template,
  Parameter,
  Table,
  Field,
  Enum,
  i18n
}
