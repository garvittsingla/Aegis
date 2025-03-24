import FlowingMenu from "@/outercomponents/FlowingMenu/FlowingMenu";


export default function Flowing(){


    const demoItems = [
        { link: '#', text: 'Aegis is Secure', image: 'https://i.pinimg.com/736x/9f/0d/ed/9f0ded3edc5546e970349b2fb8447d2f.jpg' },
        { link: '#', text: 'No more heartbreaks', image: 'https://i.pinimg.com/736x/c1/03/0c/c1030cd8d604b553e3890237281ebceb.jpg' },
        { link: '#', text: 'No more exam leaks', image: 'https://i.pinimg.com/736x/0b/43/0e/0b430e2629c88b344b0d0318fc110014.jpg' },
        { link: '#', text: 'No Unfare advantages,', image: 'https://i.pinimg.com/736x/53/ad/0c/53ad0cc3373bbe0ea51dd878241952c6.jpg' }
      ];

      //@ts-ignore
    return <FlowingMenu items={demoItems} />
}