import { Container, Row } from "reactstrap";
import BannerInformation from "../../../../Components/Common/BannerInformation";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ViewReservationInformation from "../../../../Components/Operation/Reservation/ViewReservationInformation";
import FormReservationInformation from "../../../../Components/Operation/Reservation/FormReservationInformation";

const ReservationDetail = () => {
    const { idReservation } = useParams();
    const [dataView, setDataView] = useState(null)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const bannerData = {
            title: `ID: ${idReservation} - Ocean Spa Hotel`,
            subInfo: [
                {
                    label: null,
                    icon: null,
                    value: [
                        {
                            label: null,
                            icon: 'ri-hotel-bed-line',
                            value: 4,
                            title: 'Noches',
                            classes: 'text-muted'
                        },
                        {
                            label: null,
                            icon: 'ri-user-2-line',
                            value: 2,
                            title: 'Adultos',
                            classes: 'text-muted'
                        },
                        {
                            label: null,
                            icon: 'ri-user-3-line',
                            value: 0,
                            title: 'Juniors',
                            classes: 'text-muted'
                        },
                        {
                            label: null,
                            icon: 'ri-user-unfollow-line',
                            value: 0,
                            title: 'Menores que no pagan',
                            classes: 'text-muted'
                        },
                        {
                            label: null,
                            icon: 'ri-user-follow-line',
                            value: 0,
                            title: 'Menores que pagan',
                            classes: 'text-muted'
                        },
                        {
                            label: null,
                            icon: 'ri-emotion-happy-line',
                            value: 0,
                            title: 'Infantes',
                            classes: 'text-muted'
                        }
                    ],
                    classes: 'text-muted'
                },
                {
                    label: 'Plan',
                    icon: null,
                    value: 'All Inclusive Multiple',
                    classes: 'text-muted'
                },
                {
                    label: 'Llegada',
                    icon: null,
                    value: '29/06/2023',
                    classes: 'text-muted'
                },
                {
                    label: 'Salida',
                    icon: null,
                    value: '03/07/2023',
                    classes: 'text-muted'
                },
                {
                    label: null,
                    icon: null,
                    value: 'Confirmada',
                    classes: 'badge rounded-pill bg-success fs-12'
                }
            ]
        }
        setDataView(bannerData)
    }, [idReservation])


    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <BannerInformation data={dataView}/>
                </Row>
                <Row>
                {
                    editMode ? 
                    <FormReservationInformation editMode={editMode} setEditMode={setEditMode}/>:  
                    <ViewReservationInformation editMode={editMode} setEditMode={setEditMode}/>
                }
                </Row>
            </Container>
        </div>
    );
}

export default ReservationDetail;