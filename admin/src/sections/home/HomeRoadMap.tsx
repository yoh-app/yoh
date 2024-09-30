import { m } from 'framer-motion';
// @mui
import {
  Container,
} from '@mui/material';
// _mock_
import { _homePlans } from '../../_mock';
// components
import { varFade, MotionViewport } from '../../components/animate';
// i18n
import { useTranslation } from "next-i18next";

export default function HomePoadMap() {
  const { t } = useTranslation("landing");

  return (
    <div id="roadmap" className="bg-[#F2F0FF] min-h-screen">
      <Container component={MotionViewport}>
        <m.div variants={varFade().inUp}>
          <div className="text-[#6851FF] text-[64px] text-[#6851FF] text-center py-[70px]">{t('WebsiteAdmin.LandingPage.Roadmap.Title')}</div>
        </m.div>
      </Container>
    </div>
  )
}