import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavigateButton } from '../../Button/Button';
import Wrapper from '../../Wrapper/Wrapper';
import BasicInfo from '../BasicInfo';
import * as S from './PartnerMoreInfo.style';

const msg = {
	partnerDrinking: {
		1: '술을 마시지 않는',
		2: '한 달에 한 번 정도',
		3: '일주일에 한 번 정도',
		4: '일주일에 두세 번 정도',
		5: '매일 마시는',
		6: '상관없어요',
	},
	height: {
		1: '-20cm',
		2: '-10cm',
		3: '0cm',
		4: '+10cm',
		5: '20cm',
	},
	partnerBodyTypes: {
		1: '마른',
		2: '슬림 탄탄한',
		3: '보통',
		4: '볼륨감 있는',
		5: '통통한',
	},
};

const PartnerMoreInfo = () => {
	const navigate = useNavigate();
	const [basicInfo, setBasicInfo] = useState(JSON.parse(localStorage?.getItem('basicInfo')) || {});
	const [submit, setSubmit] = useState(false);
	const [rangeMinHeightValue, setLeftSlider] = useState(10);
	const [rangeMaxHeightValue, setRightSlider] = useState(30);
	const [rangeMinHeightPercent, setrangeMinHeightPercent] = useState(
		(rangeMinHeightValue / 41) * 100,
	);
	const [rangeMaxHeightPercent, setrangeMaxHeightPercent] = useState(
		100 - (rangeMaxHeightValue / 41) * 100,
	);

	const [rangeMinWeightValue, setWeightMin] = useState(1);
	const [rangeMaxWeightValue, setWeightMax] = useState(3);

	const [rangeMinWeightPercent, setrangeMinWeightPercent] = useState(
		(rangeMinWeightValue / 4) * 100,
	);
	const [rangeMaxWeightPercent, setrangeMaxWeightPercent] = useState(
		100 - (rangeMaxWeightValue / 4) * 100,
	);

	const twoRangeHandler = fixedValue => {
		setrangeMinHeightPercent((rangeMinHeightValue / fixedValue) * 100);
		setrangeMaxHeightPercent(100 - (rangeMaxHeightValue / fixedValue) * 100);
	};

	const twoRangeHandlerWeight = fixedValue => {
		setrangeMinWeightPercent((rangeMinWeightValue / fixedValue) * 100);
		setrangeMaxWeightPercent(100 - (rangeMaxWeightValue / fixedValue) * 100);
	};

	const handlePrevBtn = () => {
		navigate('/signup/partnerLocation');
	};
	const handleNextBtn = () => {
		setSubmit(true);
		if (allChecked()) {
			localStorage.setItem('basicInfo', JSON.stringify(basicInfo));
			navigate('/signup/profilePhoto');
		}
	};

	/**
	 * 입력란이 모두 체크 되었는지 확인 비어있다면 false 아니라면 true를 반환
	 * @returns
	 */
	const allChecked = () => {
		if (
			!basicInfo.partnerDrinking ||
			!basicInfo.partnerDuty ||
			!basicInfo.partnerReligions ||
			!basicInfo.partnerSmoking
		)
			return false;
		return true;
	};

	const leftSlideChange = event => {
		if (parseInt(event.target.value) < rangeMaxHeightValue) {
			setLeftSlider(event.target.value);
			event.preventDefault();
			setBasicInfo({
				...basicInfo,
				[event.target.name]: parseInt(basicInfo.height) + parseInt(event.target.value) - 20,
			});
		}
	};

	const rightSlideChange = event => {
		if (parseInt(event.target.value) > rangeMinHeightValue) {
			setRightSlider(event.target.value);
			event.preventDefault();
			setBasicInfo({
				...basicInfo,
				[event.target.name]: parseInt(basicInfo.height) + parseInt(event.target.value) - 20,
			});
		}
	};

	const partnerMinWeightChange = event => {
		if (parseInt(event.target.value) < rangeMaxWeightValue) {
			setWeightMin(parseInt(event.target.value));
			event.preventDefault();
			const tempBodyTypeArr = [];

			for (let i = parseInt(event.target.value) + 1; i <= rangeMaxWeightValue + 1; i++)
				tempBodyTypeArr.push(i);

			setBasicInfo({
				...basicInfo,
				[event.target.name]: tempBodyTypeArr,
				partnerBodyTypesLeft: parseInt(event.target.value) + 1,
			});
		}
	};

	const partnerMaxWeightChange = event => {
		if (parseInt(event.target.value) > rangeMinWeightValue) {
			setWeightMax(parseInt(event.target.value));
			event.preventDefault();
			const tempBodyTypeArr = [];
			for (let i = rangeMinWeightValue + 1; i <= parseInt(event.target.value) + 1; i++)
				tempBodyTypeArr.push(i);

			setBasicInfo({
				...basicInfo,
				[event.target.name]: tempBodyTypeArr,
				partnerBodyTypesRight: parseInt(event.target.value) + 1,
			});
		}
	};

	const radioChange = e => {
		e.preventDefault();
		setBasicInfo({
			...basicInfo,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		if (basicInfo.partnerBodyTypes) {
			setWeightMin(basicInfo.partnerBodyTypesLeft - 1);
			setWeightMax(basicInfo.partnerBodyTypesRight - 1);
		}

		if (basicInfo.partnerMaxHeight) {
			setLeftSlider(20 - (basicInfo.height - basicInfo.partnerMinHeight));
			setRightSlider(basicInfo.partnerMaxHeight - basicInfo.height + 20);
		}
	}, []);

	useEffect(() => {
		twoRangeHandlerWeight(4);
	}, [rangeMaxWeightValue, rangeMinWeightValue]);

	useEffect(() => {
		twoRangeHandler(41);
	}, [rangeMaxHeightValue, rangeMinHeightValue]);

	useEffect(() => {
		setBasicInfo({
			...basicInfo,
			partnerBodyTypes: [2, 4],
			partnerBodyTypesLeft: 2,
			partnerBodyTypesRight: 4,

			partnerMinHeight: parseInt(basicInfo.height) - 10,
			partnerMaxHeight: parseInt(basicInfo.height) + 10,
		});
	}, []);

	return (
		<Wrapper titleMessage="원하는 조건을 입력해주세요" titleWidth="39rem">
			<S.InfoMessage>
				<S.Red>매칭 시에만 활용</S.Red>되며, 상대방에게는 정보가 공개되지 않아요
			</S.InfoMessage>
			<S.Content>
				<S.BasicInfoWrapper>
					{submit && !basicInfo.partnerDuty ? (
						<S.ErrorMessage>군대 여부를 선택해주세요</S.ErrorMessage>
					) : (
						<S.Label>군대 여부</S.Label>
					)}
					<S.NarrowButton focused={basicInfo.partnerDuty === 'true'}>
						<S.RadioLabel htmlFor="군필">군필</S.RadioLabel>
						<S.NarrowInput
							type="radio"
							name="partnerDuty"
							id="군필"
							value={true}
							onClick={radioChange}
						/>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerDuty === 'false'}>
						<S.RadioLabel htmlFor="미필">미필</S.RadioLabel>
						<S.NarrowInput
							type="radio"
							name="partnerDuty"
							id="미필"
							value={false}
							onClick={radioChange}
						/>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerDuty === 'any'}>
						<S.RadioMediumLabel htmlFor="dutyAny">
							상관없어요
							<S.NarrowInput
								type="radio"
								name="partnerDuty"
								id="dutyAny"
								value="any"
								onClick={radioChange}
							/>
						</S.RadioMediumLabel>
					</S.NarrowButton>
				</S.BasicInfoWrapper>
				<S.BasicInfoWrapper>
					{submit && !basicInfo.partnerSmoking ? (
						<S.ErrorMessage>흡연 여부를 선택해주세요</S.ErrorMessage>
					) : (
						<S.Label>흡연 여부</S.Label>
					)}
					<S.NarrowButton focused={basicInfo.partnerSmoking === 'true'}>
						<S.RadioLabel htmlFor="흡연">
							흡연
							<S.NarrowInput
								type="radio"
								name="partnerSmoking"
								id="흡연"
								value={true}
								onClick={radioChange}
							/>
						</S.RadioLabel>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerSmoking === 'false'}>
						<S.RadioLabel htmlFor="비흡연">
							비흡연
							<S.NarrowInput
								type="radio"
								name="partnerSmoking"
								id="비흡연"
								value={false}
								onClick={radioChange}
							/>
						</S.RadioLabel>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerSmoking === 'any'}>
						<S.RadioMediumLabel htmlFor="smokingAny">
							상관없어요
							<S.NarrowInput
								type="radio"
								name="partnerSmoking"
								id="smokingAny"
								value="any"
								onClick={radioChange}
							/>
						</S.RadioMediumLabel>
					</S.NarrowButton>
				</S.BasicInfoWrapper>
				<S.WideInfoWrapper>
					{submit && !basicInfo.partnerReligions ? (
						<S.ErrorMessage>종교를 선택해주세요</S.ErrorMessage>
					) : (
						<S.LongLabel>종교</S.LongLabel>
					)}
					<S.NarrowButton focused={basicInfo.partnerReligions === '기독교'}>
						<S.RadioMediumLabel htmlFor="기독교">기독교</S.RadioMediumLabel>
						<S.NarrowInput
							type="radio"
							name="partnerReligions"
							id="기독교"
							value="기독교"
							onClick={radioChange}
						/>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerReligions === '천주교'}>
						<S.RadioMediumLabel htmlFor="천주교">천주교</S.RadioMediumLabel>
						<S.NarrowInput
							type="radio"
							name="partnerReligions"
							id="천주교"
							value="천주교"
							onClick={radioChange}
						/>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerReligions === '불교'}>
						<S.RadioMediumLabel htmlFor="불교">불교</S.RadioMediumLabel>
						<S.NarrowInput
							type="radio"
							name="partnerReligions"
							id="불교"
							value="불교"
							onClick={radioChange}
						/>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerReligions === '기타'}>
						<S.RadioMediumLabel htmlFor="기타">기타</S.RadioMediumLabel>
						<S.NarrowInput
							type="radio"
							name="partnerReligions"
							id="기타"
							value="기타"
							onClick={radioChange}
						/>
					</S.NarrowButton>
					<S.NarrowButton focused={basicInfo.partnerReligions === '무교'}>
						<S.RadioWideLabel htmlFor="무교">무교</S.RadioWideLabel>
						<S.NarrowInput
							type="radio"
							name="partnerReligions"
							id="무교"
							value="무교"
							onClick={radioChange}
						/>
					</S.NarrowButton>
				</S.WideInfoWrapper>
				<S.BasicInfoWrapper>
					{submit && !basicInfo.partnerDrinking ? (
						<S.ErrorMessage>음주 빈도를 선택해주세요</S.ErrorMessage>
					) : (
						<S.LongLabel htmlFor="partnerDrinking">
							음주 빈도
							{basicInfo.partnerDrinking === '1' || basicInfo.partnerDrinking === '5' ? (
								<S.DegreeMessage>
									<S.Red>{msg.partnerDrinking[basicInfo.partnerDrinking]}</S.Red> 게 좋아요
								</S.DegreeMessage>
							) : null}
							{parseInt(basicInfo.partnerDrinking) >= 2 &&
							parseInt(basicInfo.partnerDrinking) <= 4 ? (
								<S.DegreeMessage>
									<S.Red>{msg.partnerDrinking[basicInfo.partnerDrinking]}</S.Red>가 좋아요
								</S.DegreeMessage>
							) : null}
							{basicInfo.partnerDrinking === '6' ? (
								<S.DegreeMessage>
									<S.Red>상관없어요</S.Red>
								</S.DegreeMessage>
							) : null}
						</S.LongLabel>
					)}
					<S.SliderWrapper>
						<S.Slider
							type="range"
							name="partnerDrinking"
							min="1"
							max="6"
							step="1"
							value={basicInfo.partnerDrinking}
							degree={(parseInt(basicInfo.partnerDrinking) - 1) * 20}
							onChange={radioChange}
						/>
					</S.SliderWrapper>
				</S.BasicInfoWrapper>
				<S.BasicInfoWrapper>
					{submit && basicInfo.partnerMinHeight === null ? (
						<S.ErrorMessage>키를 선택해주세요</S.ErrorMessage>
					) : (
						<S.LongLabel htmlFor="height">
							키
							{basicInfo.partnerMinHeight !== null || basicInfo.partnerMaxHeight !== null ? (
								<S.DegreeMessage>
									내 키에서 <S.Red>{rangeMinHeightValue - 20}</S.Red>cm 부터{' '}
									<S.Red>{rangeMaxHeightValue - 20}</S.Red>cm가 좋아요
								</S.DegreeMessage>
							) : null}
						</S.LongLabel>
					)}
					<S.SliderWrapper>
						<S.CustomRangeWrap>
							<S.CustomRangeMin
								type="range"
								value={rangeMinHeightValue}
								name="partnerMinHeight"
								min="0"
								max="40"
								onChange={e => {
									leftSlideChange(e);
								}}
							/>
							<S.CustomRangeMax
								type="range"
								value={rangeMaxHeightValue}
								min="0"
								max="40"
								name="partnerMaxHeight"
								onChange={e => {
									rightSlideChange(e);
								}}
							/>
						</S.CustomRangeWrap>
						<S.CustomSlide></S.CustomSlide>
						<S.CustomSlideInner
							rangeMinPercent={rangeMinHeightPercent}
							rangeMaxPercent={rangeMaxHeightPercent}
						></S.CustomSlideInner>
					</S.SliderWrapper>
				</S.BasicInfoWrapper>
				<S.BasicInfoWrapper>
					{submit && basicInfo.partnerBodyTypes === null ? (
						<S.ErrorMessage>체형을 선택해주세요</S.ErrorMessage>
					) : (
						<S.LongLabel htmlFor="partnerBodyTypes">
							체형
							{basicInfo.partnerBodyTypesLeft !== null ? (
								<S.DegreeMessage>
									<S.Red>{msg.partnerBodyTypes[rangeMinWeightValue + 1]}</S.Red> 체형부터
									<S.Red> {msg.partnerBodyTypes[rangeMaxWeightValue + 1]}</S.Red> 체형이 좋아요
								</S.DegreeMessage>
							) : null}
						</S.LongLabel>
					)}
					<S.SliderWrapper>
						<S.CustomRangeWrap>
							<S.CustomRangeMin
								type="range"
								value={rangeMinWeightValue}
								name="partnerBodyTypes"
								min="0"
								max="4"
								onChange={e => {
									partnerMinWeightChange(e);
								}}
							/>
							<S.CustomRangeMax
								type="range"
								value={rangeMaxWeightValue}
								name="partnerBodyTypes"
								min="0"
								max="4"
								onChange={e => {
									partnerMaxWeightChange(e);
								}}
							/>
						</S.CustomRangeWrap>
						<S.CustomSlide></S.CustomSlide>
						<S.CustomSlideInner
							rangeMinPercent={rangeMinWeightPercent}
							rangeMaxPercent={rangeMaxWeightPercent}
						></S.CustomSlideInner>
					</S.SliderWrapper>
				</S.BasicInfoWrapper>
			</S.Content>
			<NavigateButton handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn} />
		</Wrapper>
	);
};

export default PartnerMoreInfo;
