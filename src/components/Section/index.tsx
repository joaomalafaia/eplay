import { CardContainer, SectionTitle } from './styles'

export type Props = {
  title: string
  background: 'black' | 'gray'
  children: JSX.Element
}

const Section = ({ title, background, children }: Props) => (
  <CardContainer background={background}>
    <div className="container">
      <SectionTitle>{title}</SectionTitle>
      {children}
    </div>
  </CardContainer>
)

export default Section
