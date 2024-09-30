import dynamic from 'next/dynamic';

const Xenon = dynamic(() => import('@components/collection/card/xenon'));

export default function renderCard(card: any, collection: Record<string,any>, className = '') {
  switch (collection?.collectionStyle) {
    default:
      return <Xenon card={card} className={className} />;
  }
}
