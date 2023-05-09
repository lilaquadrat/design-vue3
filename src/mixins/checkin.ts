import inview from 'src/libs/lila-inview';
export function checkInview(el: any) {

    window?.addEventListener('scrolled', () => {
        inview.check(el);

    });

}