// components = {
//     about: '/',
//     contact: '/contact',
//     clientsProjects: '/clients&projects',
// }

const Router = {
    currentUrl: '/',
    components: {},
    rootComponent: {},
    init: (rootComponentId, componentsIds, currentUrl = '') => {
        Router.currentUrl = currentUrl;
        Router.rootComponent = document.getElementById(rootComponentId);
        componentsIds.forEach(componentId => {
            let component = document.getElementById(componentId);
            Router.components[componentId] = component;
            if (currentUrl == componentId)
                component.classList.remove('not-active-component');
            else
                component.classList.add('not-active-component');
        });
    },
    route: (routeEvent) => {
        routeEvent.preventDefault();
        let url = routeEvent.target.href.split('/').at(-1).toLowerCase();
        for (const componentId in Router.components) {
            if (Object.hasOwnProperty.call(Router.components, componentId)) {
                const component = Router.components[componentId];
                if (url == componentId){
                    Router.currentUrl = url;
                    component.classList.remove('not-active-component');
                }
                else
                    component.classList.add('not-active-component');

            }
        }
    }

}

export default Router;
