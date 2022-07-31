let myPlugin = {};
myPlugin.install = function (vue, option) {
  vue.directive(option.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase();
  });
};
export default myPlugin;
