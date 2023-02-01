import styled from 'styled-components';
import FONTSIZE from '../../../constants/fontsize';
import PALETTE from '../../../constants/palette';

const InfoMessage = styled.p`
	font-size: ${FONTSIZE.infoText};
	font-weight: 700;
	line-height: 1.5rem;
	position: absolute;
	top: 9rem;
	left: 2rem;
`;
const Red = styled.span`
	color: ${PALETTE.PINK600};
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	top: 13rem;
	left: 0rem;
	position: absolute;
	width: 39rem;
	height: 59.3rem;
	gap: 3rem;
	padding: 2rem 0rem;
	overflow-y: scroll;
	overflow-x: hidden;
	::-webkit-scrollbar {
		display: none;
	}
`;
const BasicInfoWrapper = styled.div`
	width: 39rem;
	height: 8.9rem;
	margin-bottom: 0.5rem;
`;
const BasicInput = styled.input`
	position: relative;
	width: 34.2rem;
	height: 4.8rem;
	left: 2.4rem;
	top: 1.2rem;
	background: #eeeeee;
	border: none;
	border-radius: 0.8rem;
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 500;
	font-size: 1.3rem;
	line-height: 2.8rem;
	letter-spacing: 0.08rem;
	padding-left: 1.6rem;
`;
const WideInfoWrapper = styled.div`
	width: 39rem;
	height: 22rem;
`;
const RadioLabel = styled.label`
	position: relative;
	width: 10rem;
	height: 2.8rem;
	width: 16rem;
	height: 4.8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
const NarrowButton = styled.button`
	top: 1.2rem;
	left: 1.2rem;
	position: relative;
	margin-right: 2.2rem;
	margin-bottom: 1.8rem;
	background: ${props => (props.focused ? PALETTE.PINK600 : PALETTE.BLACK200)};
	color: ${props => (props.focused ? PALETTE.WHITE : PALETTE.BLACK)};
	border: none;
	border-radius: 0.8rem;
	font-size: ${FONTSIZE.text};
`;
const NarrowInput = styled.input`
	display: none;
`;
const WideButton = styled.button`
	top: 1.8rem;
	left: 1.8rem;
	position: relative;
	margin-right: 2.2rem;
	margin-bottom: 1.8rem;
	background: ${props => (props.focused ? PALETTE.PINK600 : PALETTE.BLACK200)};
	color: ${props => (props.focused ? PALETTE.WHITE : PALETTE.BLACK)};
	border: none;
	border-radius: 0.8rem;
`;
export const WideRadioLabel = styled.label`
	width: 34.2rem;
	height: 4.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;
const Label = styled.label`
	display: flex;
	left: 2.4rem;
	position: relative;
	width: 10rem;
	height: 2.8rem;
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: bolder;
	font-size: 1.7rem;
	line-height: 2.8rem;
	letter-spacing: 0.08rem;
`;
const LongLabel = styled(Label)`
	display: inline-block;
	width: 39rem;
`;
const Slider = styled.input`
	top: 1.2rem;
	left: 2.4rem;
	position: relative;
	width: 34.1rem;
	height: 2rem;
	margin-bottom: 3.1rem;
	border-radius: 0.8rem;
	background: #eeeeee;
	outline: none;
	cursor: pointer;
	-webkit-appearance: none;
	${({ degree }) =>
		`background: linear-gradient(to right, #f45e5f 0%, #f45e5f ${degree}%, #EEEEEE ${degree}%)`};
	&::-webkit-slider-thumb {
		appearance: none;
		width: 4.8rem;
		height: 4.8rem;
		border-radius: 100%;
		cursor: pointer;
		background: ${({ degree }) => (degree >= 0 ? `#f45e5f` : `#e0e0e0`)};
	}
`;
const ErrorMessage = styled.span`
	display: block;
	top: 0rem;
	left: 2.4rem;
	position: relative;
	width: 25rem;
	height: 2.8rem;
	color: #f45e5f;
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: bolder;
	font-size: 1.7rem;
	line-height: 2.8rem;
	letter-spacing: 0.08rem;
`;
const DegreeMessage = styled.span`
	left: 1.6rem;
	position: relative;
	width: 13rem;
	height: 2rem;
	color: #f45e5f;
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: bolder;
	font-size: 1.3rem;
	line-height: 2rem;
	letter-spacing: 0.05rem;
`;
const BtnWrapper = styled.div`
	top: 71rem;
	left: 1.3rem;
	position: fixed;
	width: 35.3rem;
	height: 7.8rem;
	background: white;
`;
export {
	Content,
	InfoMessage,
	Red,
	BasicInfoWrapper,
	WideInfoWrapper,
	Label,
	LongLabel,
	NarrowButton,
	RadioLabel,
	ErrorMessage,
	Slider,
	DegreeMessage,
	NarrowInput,
	BasicInput,
	WideButton,
	BtnWrapper,
};
