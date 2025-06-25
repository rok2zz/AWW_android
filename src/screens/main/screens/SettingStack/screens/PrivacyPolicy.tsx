import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabHeader from "../../../../../components/header/TabHeader";

const PrivacyPolicy = () => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={ styles.wrapper }>
            <StatusBar translucent backgroundColor="transparent"/>
            <TabHeader title="개인정보 처리방침" type={ 0 } isFocused={ false } before={""} />
        
            <View style={ styles.container }>
                <Text style={ styles.boldText }>모인 서비스 개인(위치)정보처리방침</Text>
                <Text style={ styles.regularText }> <Text style={ styles.boldText }>(주)제이비엔터테인먼트</Text>(이하 “회사”)는 모인 서비스 이용자의 자유와 권리 보호를 위해
                    「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고
                    안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인
                    정보의 처리와 보호에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원
                    활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립・공개합니다.
                </Text>
            </View>
            
            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center'  }]}>1. 개인정보의 처리 목적</Text>
                <Text style={ styles.regularText }>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
                    목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호
                    법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </Text>
                <Text style={ styles.boldText }>1. 이용자 관리</Text>
                <Text style={ styles.regularText }>
                    콘텐츠 제공에 따른 개인 식별, 불량 이용자 관리, 비정상 이용자 적발 및 이용제한, 계
                    약이행, 각종 고지・통지, 고충처리 목적으로 개인정보를 처리합니다.
                </Text>
                <Text style={ styles.boldText }>2. 서비스 제공</Text>
                <Text style={ styles.regularText }>
                    위치정보에 기반한 날씨, 대기 지수 등 날씨 관련 정보 서비스 제공, 기타 콘텐츠 제공,
                    맞춤서비스 제공, 구독요금결제의 목적으로 개인정보를 처리합니다.
                </Text>
                <Text style={ styles.boldText }>3. 마케팅과 광고</Text>
                <Text style={ styles.regularText }>
                    마케팅 메시지 및 광고 전달, 통계 작성, 광고 및 기타 콘텐츠의 성과·효과 측정 및 분석
                    을 목적으로 개인정보를 처리합니다.
                </Text>
            </View>

            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>2. 처리하는 개인정보 항목 및 보유기간</Text>
                <Text style={ styles.regularText }>
                    ① 회사는 서비스 제공을 위해 필요 최소한의 범위에서 개인정보를 수집・이용하며, 다
                    음의 개인정보 항목을 「개인정보 보호법」 제15조 제1항 제1호 및 제22조 제1항 제7호
                    에 따라 정보주체의 동의를 받아 처리하고 있습니다.
                </Text>

                <View style={ styles.table }>
                    <View style={ styles.tableRow }>
                        <View style={[ styles.tableItem, { width: '33%' }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>구분 (처리시점)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '33%' }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>수집 항목</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '33%', borderRightWidth: 0 }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>보유 및 이용기간</Text>
                        </View>
                    </View>

                    <View style={ styles.tableRow }>
                        <View style={[ styles.tableItem, { width: '33%' }]}>
                            <Text style={ styles.tableText }>서비스 이용 신청 시</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '33%' }]}>
                            <Text style={ styles.tableText }>유저 고유식별자, 기기 정보(OS, 앱버전, country_code, language_code)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '33%', borderRightWidth: 0 }]}>
                            <Text style={ styles.tableText }>서비스 탈퇴 또는 동의 철회 시</Text>
                        </View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '33%' }]}>
                            <Text style={ styles.tableText }>애플리케이션 및 서비스 이용 시 </Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '33%' }]}>
                            <Text style={ styles.tableText }>위치정보(기기의 위경도 gps 데이터, 기기의 위경도gps 데이터에 의한 위치명)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '33%', borderRightWidth: 0 }]}>
                            <Text style={ styles.tableText }>로부터 6개월</Text>
                        </View>
                    </View>
                </View>


                <Text style={ styles.regularText }>
                    ② 회사는 아래의 광고 사업자가 회사 서비스 내 생성정보 분석 툴을 통해 IP주소, 쿠키,
                    토큰, 접속 로그, 서비스 이용 기록 등 온라인상의 이용자 행태정보를 수집하고, 이용자
                    대상 맞춤형 광고 서비스로 전송 목적으로 이용할 수 있도록 허용하고 있습니다.
                </Text>
                <Text style={ styles.regularText }>
                    1) 광고 사업자: AdPopcorn, NAM(Naver Ad Manager), Admob, Pangle, Meta, Inmobi,
                    HyBid (PubNative), Vungle(LifeOff), DTExchange : Fyber, AppLovin, IronSource, Mintegral
                </Text>
                <Text style={ styles.regularText }>2) 수집 방법: 행태정보 수집은 서비스 이용 과정에서 자동 생성되어 저장되는 형태입니다.</Text>
                <Text style={ styles.regularText }>
                    ③ 회사는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유・이용기간 내
                    에서 개인정보를 처리・보유합니다. 다만, 다음의 사유에 해당하는 경우에는 해당 기간
                    종료시까지 보관할 수 있습니다.
                </Text>
                <Text style={ styles.regularText }>1) 「전자상거래 등에서의 소비자 보호에 관한 법률」 제6조에 따른 표시・광고, 계약내용 및 이행 등 거래에 관한 기록</Text>
                <Text style={ styles.regularText }>- 계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년</Text>
                <Text style={ styles.regularText }>- 소비자 불만 또는 분쟁처리에 관한 기록 : 3년</Text>
                <Text style={ styles.regularText }>2) 「통신비밀보호법」제15조의2에 따른 통신사실확인자료 보관</Text>
                <Text style={ styles.regularText }>- 컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월</Text>
                <Text style={ styles.regularText }>- 소비자 불만 또는 분쟁처리에 관한 기록 : 3년</Text>
            </View>

            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>3. 개인정보의 파기 절차 및 방법</Text>
                <Text style={ styles.regularText }>
                    ① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을
                    때에는 지체없이 해당 개인정보를 파기합니다.
                </Text>
                <Text style={ styles.regularText }>
                    ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에
                    도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정
                    보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
                </Text>
                <Text style={ styles.regularText }>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</Text>
                <Text style={ styles.regularText }>1) 파기절차</Text>
                <Text style={ styles.regularText }>- 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</Text>
                <Text style={ styles.regularText }>2) 파기방법 </Text>
                <Text style={ styles.regularText }>
                    - 회사는 전자적 파일 형태로 기록・저장된 개인정보는 기록을 재생할 수 없도록 파기하
                    며, 종이 문서에 기록・저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                </Text>
            </View>

            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>4. 개인정보의 제3자 제공</Text>
                <Text style={ styles.regularText }>
                    ① 회사는 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리
                    하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에
                    해당하는 경우에만 개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를
                    제3자에게 제공하지 않습니다.
                </Text>
                <Text style={ styles.regularText }>
                    ② 회사는 원활한 서비스 제공을 위해 다음의 경우 개인정보 보호법 제17조 제1항 제1
                    호에 따라 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.
                </Text>

                <View style={ styles.table }>
                    <View style={ styles.tableRow }>
                        <View style={[ styles.tableItem, { width: '25%' }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>제공받는 자</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>제공 목적</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>제공 항목 </Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>보유 및 이용기간</Text>
                        </View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>Firebase (Google Analytics)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>서비스 제공을 위한 모니터링,유지 관리</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>유저 이벤트 (세션,IP,서비스 내 행동 데이터 등)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}>
                            <Text style={ styles.tableText }>서비스 탈퇴 또는 동의 철회 시</Text>
                        </View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>Google (Google Map SDK)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>서비스 내 위치기능 제공</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}>
                            <Text style={ styles.tableText }>위치정보 (기기의 위경도 gps 데이터)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}></View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>네이버 주식회사</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>서비스 내 위치기능 제공</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}></View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}></View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>주식회사 카카오</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>서비스 내 위치기능 제공</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}></View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}></View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>Apple (Apple Weather Kit)</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>서비스 내 위치기능 제공</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}></View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}></View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>Accuweather</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                            <Text style={ styles.tableText }>서비스 내 위치기능 제공</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}></View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}></View>
                    </View>

                    <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                        <View style={[ styles.tableItem, { width: '25%' }]}>
                            <Text style={ styles.tableText }>기상청</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}>
                            <Text style={ styles.tableText }>서비스 내 위치기능 제공</Text>
                        </View>
                        <View style={[ styles.tableItem, { width: '25%' }]}></View>
                        <View style={[ styles.tableItem, { width: '25%', borderRightWidth: 0 }]}></View>
                    </View>
                </View>

                <Text style={ styles.regularText }>
                    ③ 맞춤형 서비스 제공을 위한 행태정보 수집 및 제공과 관련하여서는, 본 개인정보처리
                    방침 제10조를 참고하여 주시기 바랍니다.
                </Text>
            </View>

            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>5. 개인정보의 국외이전</Text>
                <Text style={ styles.regularText }>
                    ① 회사는 서비스 이용자로부터 수집한 개인정보를 아래와 같이 국외에 제공・위탁하고
                    있습니다. 재난, 재해로 인한 데이터 소실 시 복구를 위해 전체 데이터 백업(보관)을 원
                    칙으로 하고 있어 국외 이전을 거부하실 경우 서비스 이용이 불가능합니다. 국외 이전을
                    원치 않으실 경우 애플리케이션을 삭제하여 서비스 이용을 중단하여 주시기 바랍니다.
                </Text>

                <View style={ styles.table }>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[ styles.tableItem, { width: '10%', borderBottomWidth: 1 }]}>
                            <Text style={[ styles.boldText, { marginBottom: 0 }]}>관련 근거</Text>
                        </View>
                        <View style={[ styles.tableRow, { flex: 1 }]}> 
                            <View style={[ styles.tableItem, { width: '25%' }]}>
                                <Text style={[ styles.boldText, { marginBottom: 0 }]}>이전하는 개인정보 항목</Text>
                            </View>
                            <View style={[ styles.tableItem, { width: '10%' }]}>
                                <Text style={[ styles.boldText, { marginBottom: 0 }]}>이전국가</Text>
                            </View>
                            <View style={[ styles.tableItem, { width: '35%' }]}>
                                <Text style={[ styles.boldText, { marginBottom: 0 }]}>이전받는 자</Text>
                            </View>
                            <View style={[ styles.tableItem, { width: '20%', borderRightWidth: 0 }]}>
                                <Text style={[ styles.boldText, { marginBottom: 0 }]}>개인정보 보유 및 이용기간</Text>
                            </View>
                        </View>
                    </View>
                  
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[ styles.tableRow, { width: '10%', borderBottomWidth: 0 }]}>
                            <View style={ styles.tableItem }>
                                <Text style={ styles.tableText }>개인정보보호법 제28조의8 제1항 제1호(정보주체의 동의)</Text>
                            </View>
                        </View>
                    
                        <View style={{ flex: 1 }}>
                            <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                                <View style={[ styles.tableItem, { width: '25%', borderBottomWidth: 1 }]}>
                                    <Text style={ styles.tableText }>유저 고유식별자, 기기정보,위치정보 및 사용 데이터(모델명, 접속 세션데이터 등)</Text>
                                </View>
                                <View style={[ styles.tableItem, { width: '10%', borderBottomWidth: 1 }]}>
                                    <Text style={ styles.tableText }>미국 U.S.A.</Text>
                                </View>
                                <View style={[ styles.tableItem, { width: '35%', borderBottomWidth: 1 }]}>
                                    <View>
                                        <Text style={ styles.tableText }>법인명: Firebase (GoogleAnalytics)</Text>
                                        <Text style={ styles.tableText }>연락처: (650) 253-0000</Text>
                                    </View>
                                </View>
                                <View style={[ styles.tableItem, { width: '20%', borderRightWidth: 0 }]}>
                                    <Text style={ styles.tableText }>서비스 탈퇴 또는 동의 철회 시</Text>
                                </View>
                            </View>

                            <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                                <View style={[ styles.tableItem, { width: '25%' }]}>
                                    <Text style={ styles.tableText }>위치정보 (기기의 위경도 gps데이터)</Text>
                                </View>
                                <View style={[ styles.tableItem, { width: '10%', borderBottomWidth: 1 }]}>
                                    <Text style={ styles.tableText }>미국 U.S.A.</Text>
                                </View>
                                <View style={[ styles.tableItem, { width: '35%', borderBottomWidth: 1 }]}>
                                    <View>
                                        <Text style={ styles.tableText }>법인명: Google (Google Map SDK)</Text>
                                        <Text style={ styles.tableText }>연락처: (650) 253-0000</Text>
                                    </View>
                                </View>
                                <View style={[ styles.tableItem, { width: '20%', borderRightWidth: 0 }]}></View>
                            </View>

                            <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                                <View style={[ styles.tableItem, { width: '25%' }]}></View>
                                <View style={[ styles.tableItem, { width: '10%', borderBottomWidth: 1 }]}>
                                    <Text style={ styles.tableText }>미국 U.S.A.</Text>
                                </View>
                                <View style={[ styles.tableItem, { width: '35%', borderBottomWidth: 1 }]}>
                                    <View>
                                        <Text style={ styles.tableText }>법인명: Apple (Apple Weather Kit)</Text>
                                        <Text style={ styles.tableText }>연락처: 080 333 4000</Text>
                                    </View>
                                </View>
                                <View style={[ styles.tableItem, { width: '20%', borderRightWidth: 0 }]}></View>
                            </View>
                            
                            <View style={[ styles.tableRow, { borderBottomWidth: 0 }]}>
                                <View style={[ styles.tableItem, { width: '25%' }]}></View>
                                <View style={[ styles.tableItem, { width: '10%' }]}>
                                    <Text style={ styles.tableText }>미국 U.S.A.</Text>
                                </View>
                                <View style={[ styles.tableItem, { width: '35%' }]}>
                                    <View>
                                        <Text style={ styles.tableText }>법인명: Accuweather</Text>
                                        <Text style={ styles.tableText }>연락처: support@accuweather.com</Text>
                                    </View>
                                </View>
                                <View style={[ styles.tableItem, { width: '20%', borderRightWidth: 0 }]}></View>
                            </View>
                        </View>
                    </View>

                    
                </View>
                   

                <Text style={ styles.regularText }>
                    ③ 맞춤형 서비스 제공을 위한 행태정보 수집 및 제공과 관련하여서는, 본 개인정보처리
                    방침 제10조를 참고하여 주시기 바랍니다.
                </Text>
            </View>

            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>6. 개인정보의 안전성 확보조치</Text>
                <Text style={ styles.regularText }>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</Text>
                <Text style={ styles.regularText }>1. 관리적 조치 :</Text>
                <Text style={ styles.regularText }>1) 개인정보관리책임자의 지정</Text>
                <Text style={ styles.regularText }>2) 개인정보의 수집·이용·제공·파기 등 각 단계별 접근 권한자 지정 및 권한의 제한 방안</Text>
                <Text style={ styles.regularText }>3) 개인정보보호 취급자의 의무와 책임을 규정한 취급·관리 절차 및 지침 마련</Text>
                <Text style={ styles.regularText }>4) 개인정보 제공사실 등을 기록한 취급대장의 운영·관리 계획</Text>
                <Text style={ styles.regularText }>5) 개인정보 보호조치에 대한 정기적인 자체 검사 계획</Text>
                <Text style={ styles.regularText }>2. 기술적 조치 :</Text>
                <Text style={ styles.regularText }>1) 개인정보 및 개인정보시스템의 접근권한을 확인할 수 있는 식별 및 인증 절차</Text>
                <Text style={ styles.regularText }>2) 개인정보시스템에의 권한없는 접근을 차단하기 위한 방화벽 설치 등 의 조치 계획</Text>
                <Text style={ styles.regularText }>3) 개인정보시스템에 대한 접근사실의 전자적 자동 기록·보존 장치의 운 영 계획</Text>
                <Text style={ styles.regularText }>4) 개인정보시스템의 침해사고 방지를 위한 보안프로그램 설치 및 운영 계획</Text>
                <Text style={ styles.regularText }>5) 개인정보를 안전하게 저장·전송할 수 있는 암호화 기술의 적용이나 이에 상응하는 조치 방안</Text>
                <Text style={ styles.regularText }>6) 그 밖에 방송통신위원회가 위치정보의 보호를 위하여 필요하다고 인 정하는 기술적 조치 방안</Text>
                <Text style={ styles.regularText }>3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제</Text>
            </View>

            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>8. 정보주체와 법정대리인의 권리・의무 및 행사방법</Text>
                <Text style={ styles.regularText }>
                    ① 정보주체는 회사에 대해 언제든지 개인정보 열람・정정・ 삭제・처리정지 및 철회 요
                    구, 자동화된 결정에 대한 거부 또는 설명 요구 등의 권리를 행사(이하 “권리 행사”라
                    함)할 수 있습니다.
                </Text>
                <Text style={ styles.regularText }>
                    ② 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 유선전화,
                    서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이
                    조치하겠습니다.
                </Text>
                <Text style={ styles.regularText }>
                    ③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
                    도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시” 별지 제11호 서식에 따른 위임
                    장을 제출하셔야 합니다.
                </Text>
                <Text style={ styles.regularText }>
                    ④ 정보주체가 개인정보 열람 및 처리 정지를 요구할 권리는 「개인정보 보호법」 제35조
                    제4항 및 제37조 제2항에 의하여 제한될 수 있습니다.
                </Text>
                <Text style={ styles.regularText }>
                    ⑤ 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 해당 개인정보
                    의 삭제를 요구할 수 없습니다.
                </Text>
                <Text style={ styles.regularText }>
                    ⑥ 자동화된 결정이 이루어진다는 사실에 대해 정보주체의 동의를 받았거나, 계약 등을
                    통해 미리 알린 경우, 법률에 명확히 규정이 있는 경우에는 자동화된 결정에 대한 거부
                    는 인정되지 않으며 설명 및 검토 요구만 가능합니다.
                </Text>
                <Text style={ styles.regularText }>
                    - 또한 자동화된 결정에 대한 거부・설명 요구는 다른 사람의 생명・신체・재산과 그밖
                    의 이익을 부당하게 침해할 우려가 있는 등 정당한 사유가 있는 경우에는 그 요구가 거
                    절될 수 있습니다.
                </Text>
                <Text style={ styles.regularText }>⑦ 회사는 권리 행사를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</Text>
                <Text style={ styles.regularText }>⑧ 회사에 대한 권리 행사를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 권리 행사가 신속하게 처리되도록 노력하겠습니다.</Text>

                <Text style={ styles.boldText }>▶ 개인정보 열람 등 청구 접수・처리 부서</Text>
                <Text style={ styles.regularText }>부서명: 개발팀</Text>
                <Text style={ styles.regularText }>주소: 서울시 강남구 논현로 159길 18, 2층 (주)제이비엔터테인먼트</Text>
                <Text style={ styles.regularText }>연락처: jbent.dev@gmail.com</Text>

                <Text style={ styles.boldText }>개인정보의 자동 수집 장치의 설치·운영 및 그 거부에 관한 사항</Text>
                <Text style={ styles.boldText }>&lt; 설치・운영하는 개인정보 자동 수집 장치 &gt;</Text>
                <Text style={ styles.regularText }>
                    ① 회사는 이용자에게 편리한 사용환경을 제공하기 위해 ‘쿠키(cookie, 접속정보파일)’ 등
                    개인정보를 자동으로 수집하는 장치를 설치·운영 합니다.
                </Text>
                <Text style={ styles.regularText }>
                    ① 쿠키란 애플리케이션을 운영하는데 이용되는 서버가 이용자의 디바이스에 보내는 아
                    주 작은 텍스트 파일로서 이용자의 디바이스 내 저장소에 저장됩니다. 이후 이용자가 애
                    플리케이션을 이용할 경우, 서버는 이용자의 디바이스 내 저장되어 있는 쿠키의 내용을
                    읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공하기 위해 이용됩니다.
                </Text>
                <Text style={ styles.regularText }>
                    ② 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 디바이스 설
                    정 또는 옵션에서 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니
                    면 모든 쿠키의 저장을 거부할 수도 있습니다. 단, 이용자께서 모든 쿠키의 저장을 거부
                    하는 경우, 서비스 제공에 제약이 따르거나 이용이 불가할 수 있습니다.
                </Text>
                <Text style={ styles.regularText }>③ 쿠키 설치 허용 여부 설정 방법</Text>
            
                <Text style={ styles.boldText }>▶ 모바일 브라우저에서 쿠키 허용/차단</Text>
                <Text style={ styles.regularText }>- 크롬(Chrome) : 모바일 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt;인터넷 사용 기록</Text>
                <Text style={ styles.regularText }>- 사파리(Safari) : 모바일 기기 설정 &gt; 사파리(Safari) &gt; 고급 &gt; 모든 쿠키 차단</Text>
                <Text style={ styles.regularText }>- 삼성 인터넷 : 모바일 브라우저 설정 &gt; 인터넷 사용 기록 &gt; 인터넷 사용 기록 삭제</Text>

                <Text style={ styles.boldText }>▶ 모바일 단말기의 광고식별자 차단/허용 【참고3】</Text>
                <Text style={ styles.regularText }>(1) (안드로이드) ① 설정 → ② 보안 및 개인정보 보호 → ③ 개인정보 보호 →</Text>
                <Text style={ styles.regularText }>④ 기타 개인정보 설정 → ⑤ 광고 → ⑥ 광고ID 재설정 또는 광고ID 삭제</Text>
                <Text style={ styles.regularText }>(2) (아이폰) ① 설정 → ② 개인정보 보호 및 보안 → ③ 추적 → ④ 앱 추적 허용 해제</Text>
                <Text style={ styles.regularText }>※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.</Text>
                <Text style={ styles.regularText }>⑤ 정보주체는 아래의 연락처로 행태정보와 관련하여 궁금한 사항과 거부권 행사, 피해신고 접수 등을 문의할 수 있습니다.</Text>

                <Text style={ styles.boldText }>▶ 개인정보 보호 담당부서</Text>
                <Text style={ styles.regularText }>부서명 : 개발팀</Text>
                <Text style={ styles.regularText }>담당자 : 박상화</Text>
                <Text style={ styles.regularText }>연락처 : jbent.dev@gmail.com</Text>

                <Text style={ styles.boldText }>개인정보 보호책임자</Text>
                <Text style={ styles.regularText }>
                    ① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정
                    보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하
                    고 있습니다.
                </Text>
            
                <Text style={ styles.boldText }>▶ 개인정보처리 책임자</Text>
                <Text style={ styles.regularText }>이름: 박상화</Text>
                <Text style={ styles.regularText }>직위: 개발 팀장</Text>
                <Text style={ styles.regularText }>연락처: jbent.dev@gmail.com</Text>

                <Text style={ styles.boldText }>▶ 개인정보보호 담당부서</Text>
                <Text style={ styles.regularText }>부서명 : 개발팀</Text>
                <Text style={ styles.regularText }>담당자 : 박상화</Text>
                <Text style={ styles.regularText }>연락처: jbent.dev@gmail.com</Text>
                <Text style={ styles.regularText }>
                    ② 정보주체는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보보호 관
                    련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의
                    할 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니
                    다.
                </Text>
            </View>
                        
            <View style={ styles.container }>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>11. 권익침해 구제방법</Text>
                <Text style={ styles.regularText }>
                    정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터
                    넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이
                    밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
                </Text>
                <Text style={ styles.regularText }>1. 개인정보 분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</Text>
                <Text style={ styles.regularText }>2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</Text>
                <Text style={ styles.regularText }>3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</Text>
                <Text style={ styles.regularText }>4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</Text>
            </View>
  
            <View style={[ styles.container, { marginBottom: 150 }]}>
                <Text style={[ styles.boldText, { textAlign: 'center' }]}>12. 개인정보 처리방침의 변경</Text>
                <Text style={ styles.regularText }>이 개인정보 처리방침은 2025. 6. 부터 적용됩니다.</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        backgroundColor: '#ffffff'
    },
    container: {
        marginHorizontal: 15,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    boldText: {
        includeFontPadding: false,
        fontSize: 18,
        fontFamily: 'NotoSansKR-Bold',

        marginBottom: 20,

        color: '#121619'
    },
    regularText: {
        includeFontPadding: false,
        fontSize: 18,
        fontFamily: 'NotoSansKR-Regular',

        marginBottom: 20,

        color: '#121619'
    },
    table: {
        marginBottom: 10,

        borderWidth: 1,
        borderColor: '#000000'
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',

        borderBottomWidth: 1
    },
    tableItem: {
        height: '100%',
        padding: 5,
        borderRightWidth: 1,
    },
    tableText: {
        includeFontPadding: false,
        fontSize: 18,
        fontFamily: 'NotoSansKR-Regular',

        color: '#121619'
    }
});

export default PrivacyPolicy;