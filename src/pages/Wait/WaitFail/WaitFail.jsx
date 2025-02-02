import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../../components/Wrapper';
import { WrapperInner } from '../../../components/Wrapper/Wrapper.style';
import { Red } from '../../../components/Signup/PartnerMoreInfo/PartnerMoreInfo.style';
import { useGetRejection } from '../../../hooks/query/useGetRejection';
import BigButton from '../../../components/Button/BigButton/BigButton';
import SideBar from '../../../components/SideBar/SideBar';
import { useGetProfile } from '../../../hooks/query/useGetProfile';
import { useGetResignupInfo } from '../../../hooks/query/isGetResignupInfo';
import * as S from './WaitFail.style';
import RejectReason from './RejectReason/RejectReason';

const WaitFail = () => {
	const navigate = useNavigate();
	const [rejectReason, setRejectReason] = useState('');
	const handleEdit = () => {
		navigate('/wait/fail/edit');
	};

	const { resignupInfo } = useGetResignupInfo();
	const { rejection } = useGetRejection();

	return (
		<Wrapper>
			<WrapperInner>
				<S.Title>
					{resignupInfo?.nickname}님
					<br />
					다시 한번 확인해주세요
				</S.Title>

				<S.Content>
					<S.InfoTitle>
						<RejectReason reason={rejection?.reason} />
						<div>다음과 같은 사유로 가입 승인이 반려되었어요 </div>
					</S.InfoTitle>
				</S.Content>
				<BigButton onClick={handleEdit}>수정하러 가기</BigButton>
			</WrapperInner>
			<SideBar status="home" />
		</Wrapper>
	);
};

export default WaitFail;
