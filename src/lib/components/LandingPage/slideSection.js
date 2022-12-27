/**
 * @param {any} node
 * @param {{ store: { update: (store: (val: string[]) => string[]) => void; }; title: string; }} props
 */
export function slideSection(node, props) {
    props.store.update((val) => [...val, props.title || 'Untitled'])

    return {
        update() {
            return
        },
        destroy() {
            return
        }
    }
}
