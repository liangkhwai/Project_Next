'use client'
import React, { useEffect, useState } from 'react';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE } from './../../../../api';
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalDetail from './ModalDetail';
import ModalBookAdd from '../buy/book/ModalAdd';
import ChangedStatus from './ChangedStatus';
import {
    Table,
    Card,
    Button,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillHouseSlashFill,
    BsFillHouseAddFill,
    BsFillHouseUpFill,
    BsFillInfoCircleFill,
    BsCalendar2PlusFill,
    BsCaretRightFill
} from "react-icons/bs";

export default function House() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthHouse = async () => {
        try {
            const result = await GetRequest(API_HOUSE, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouse();
    }, [showData]);
    // --- //

    // modal //
    const [selectedId, setSelectedId] = useState('');
    const [selectedHouseNo, setSelectedHouseNo] = useState('');

    // +++ modal add +++ //
    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);
    // +++ //

    // +++ modal edit +++ //
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // +++ //

    // +++ modal detail +++ //
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        setShowDetail(true);
    }
    // +++ //

    // +++ modal book add +++ //
    const [showBookAdd, setShowBookAdd] = useState(false);

    const handleBookAddClose = () => setShowBookAdd(false);
    const handleBookAddShow = (id, houseNo) => {
        setSelectedId(id);
        setSelectedHouseNo(houseNo);
        setShowBookAdd(true);
    }
    // +++ //

    // --- //

    // tooltip //
    const renderTooltipDetail = (props) => (
        <Tooltip {...props}>
            ดูรายละเอียด
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipBook = (props) => (
        <Tooltip {...props}>
            จองบ้าน
        </Tooltip>
    );

    const renderTooltipOpen = (props) => (
        <Tooltip {...props}>
            เปิดการขายบ้าน
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ปิดการขายบ้าน
        </Tooltip>
    );
    // --- //

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            <ModalBookAdd show={showBookAdd} handleClose={handleBookAddClose} hId={selectedId} houseNo={selectedHouseNo} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลบ้าน</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button variant="success" onClick={handleAddShow}>
                                <BsFillHouseAddFill style={{ fontSize: '24px' }} />
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className='col-md-8' />
                        <div className='col-md-4 text-md-end mb-3'>
                            <Form.Control
                                type="search"
                                placeholder="ค้นหา"
                            />
                        </div>
                    </div>
                    <div>
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>รหัสบ้าน</th>
                                    <th>บ้านเลขที่</th>
                                    <th>โซนบ้าน</th>
                                    <th>ชื่อแบบบ้าน</th>
                                    <th>เลขที่โฉนดที่ดิน</th>
                                    <th>เลขที่หน้าสำรวจ</th>
                                    <th>
                                        ขนาดพื้นที่ดิน <br />
                                        (ตารางวา)
                                    </th>
                                    <th>
                                        ขนาดพื้นที่ใช้สอย <br />
                                        (ตารางเมตร)
                                    </th>
                                    <th>ราคาบ้านพร้อมที่ดิน</th>
                                    <th>รายละเอียด</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
                                        <tr key={data.h_id}>
                                            <td>{data.h_id}</td>
                                            <td>{data.house_no}</td>
                                            <td>{data.name}</td>
                                            <td>{data.house_name}</td>
                                            <td>{data.num_deed}</td>
                                            <td>{data.num_survey}</td>
                                            <td>{data.hLand_space.toLocaleString()}</td>
                                            <td>{data.usable_space.toLocaleString()}</td>
                                            <td>{data.price.toLocaleString()}</td>
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipDetail}>
                                                    <a onClick={() => handleDetailShow(data.h_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillInfoCircleFill className='text-primary' style={{ fontSize: '28px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>

                                            {data.h_status === 1 ? (
                                                <td>
                                                    <Badge bg="success">ว่าง</Badge>
                                                </td>
                                            ) : data.h_status === 2 ? (
                                                <td>
                                                    <Badge bg="info">จอง</Badge>
                                                </td>
                                            ) : data.h_status === 3 ? (
                                                <td>
                                                    <Badge bg="info">ทำสัญญา</Badge>
                                                </td>
                                            ) : data.h_status === 4 ? (
                                                <td>
                                                    <Badge bg="info">โอนกรรมสิทธิ์</Badge>
                                                </td>
                                            ) : data.h_status === 5 ? (
                                                <td>
                                                    <Badge bg="secondary">ขายแล้ว</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ยกเลิกขาย</Badge>
                                                </td>
                                            )}

                                            {data.h_status === 1 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipBook}>
                                                        <a onClick={() => handleBookAddShow(data.h_id, data.house_no)} style={{ cursor: 'pointer' }}>
                                                            <BsCalendar2PlusFill className='me-2 text-secondary' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger overlay={renderTooltipEdit}>
                                                        <a onClick={() => handleEditShow(data.h_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger overlay={renderTooltipClose}>
                                                        <a onClick={() => ChangedStatus(data.h_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillHouseSlashFill className='text-danger' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : data.h_status === 2 ? (
                                                <td>
                                                    <Button href="/buy/book" variant="secondary" size="sm">
                                                        <span>ไปยังหน้าจอง</span> &nbsp;
                                                        <BsCaretRightFill />
                                                    </Button>
                                                </td>
                                            ) : data.h_status === 3 ? (
                                                <td>
                                                    <Button href="/buy/contracted" variant="secondary" size="sm">
                                                        <span>ไปยังหน้าสัญญา</span> &nbsp;
                                                        <BsCaretRightFill />
                                                    </Button>
                                                </td>
                                            ) : data.h_status === 4 ? (
                                                <td>
                                                    <Button href="/buy/transfer" variant="secondary" size="sm">
                                                        <span>ไปยังหน้าโอนกรรมสิทธิ์</span> &nbsp;
                                                        <BsCaretRightFill />
                                                    </Button>
                                                </td>
                                            ) : data.h_status === 0 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipOpen}>
                                                        <a onClick={() => ChangedStatus(data.h_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillHouseUpFill className='text-success' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    {/* null */}
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center">
                                            <h4 className='mt-5 mb-5'>
                                                ไม่มีข้อมูลที่แสดง
                                            </h4>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </ProtectRoute>
    );
}