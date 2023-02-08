import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        Welcome To <br />
        My Personal Portfolio
      </SectionTitle>
      <SectionText>
        Hi, I'm Luiz Ricini, Full Stack Developer, I'm always looking to improve myself in the technologies I use and always trying to learn new technologies on the market, count on me for a job with excellence.
      </SectionText>
    </LeftSection>
  </Section>
);

export default Hero;