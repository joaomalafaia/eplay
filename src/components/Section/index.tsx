import * as S from './styles'

export type Props = {
  title: string
  background: 'black' | 'gray'
  children: JSX.Element
}

const Section = ({ title, background, children }: Props) => (
  <S.CardContainer background={background}>
    <div className="container">
      <S.SectionTitle>{title}</S.SectionTitle>
      {children}
    </div>
  </S.CardContainer>
)

export default Section
