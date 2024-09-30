import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
// import Typography from '@mui/material/Typography'
// import Grid from '@mui/material/Grid'

const TonProofModal = (props: { proofData: any; isModalOpen: boolean, setIsModalOpen: (isOpen: boolean) => void }) => {
  const { proofData, isModalOpen, setIsModalOpen } = props;
  // console.log(proofData);
  return (
    <Modal open={isModalOpen}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '20px',
          // border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <div>
          <div className="title text-2xl mb-2">Ton Proof Message</div>
          <div className="content text-gray">
            <ul className="space-y-1">
              <li className="text-md">
                timestamp:
                <span className="text-[#999] inline-block ml-1 text-sm">{proofData.timestamp}</span>
              </li>
              <li className="text-md">
                domain:
                <span className="text-[#999] inline-block ml-1 text-sm">
                  {proofData?.domain?.value}
                </span>
              </li>
              <li className="text-md">
                your wallet address:
                <span className="text-[#999] inline-block ml-1 text-sm">{proofData.from}</span>
              </li>
              <li className="text-md">
                contract address:
                <span className="text-[#999] inline-block ml-1 text-sm">{proofData.to}</span>
              </li>
              <li className="text-md">
                payload:
                <span className="text-[#999] inline-block ml-1 text-sm">{proofData.payload}</span>
              </li>
            </ul>
            <div className="flex mt-8 items-center justify-center">
              <Button sx={{ width: '100%' }} variant="contained" color="primary" size="large" onClick={() => setIsModalOpen(false)}>
                Sign
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default TonProofModal;
