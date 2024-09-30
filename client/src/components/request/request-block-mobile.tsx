import CarouselLinks from './carousel-links';

const RequestBlock: React.FC<Record<string, any>> = ({ requests, showRequests }) => {
  if (!showRequests) {
    return null;
  }
  return (
    <>
      <div
        style={{
          zIndex: 50,
          width: '100%',
          backgroundColor: '#F3F4F6',
          height: '150px',
          padding: '12px',
          position: 'fixed',
          bottom: '0',
        }}
        className="md:hidden"
      >
        <CarouselLinks data={requests} />
      </div>
    </>
  );
};

export default RequestBlock;
