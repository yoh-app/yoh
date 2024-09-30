import { motion } from 'framer-motion';
import renderCard from '@components/collection/render-card';

const Feed = ({ hasRequests, collection }:Record<string,any>) => {
  return (
    <div className="w-full bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${hasRequests? 3: 4} 2xl:grid-cols-5 3xl:grid-cols-6 gap-5`}>
        {collection?.data?.map((card: Record<string, any>, idx: number) => (
          <motion.div key={idx}>{renderCard(card, collection)}</motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
