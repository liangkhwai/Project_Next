import React, { useState, useEffect } from 'react';
import {
    DateTimeFormat,
    FormatThaiNationalID
} from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app';
import { API_CONTRACT } from '../../../../../api';
import {
    Modal,
    Image,
    Card,
    ListGroup
} from 'react-bootstrap';

export default function ModalDetail({ show, handleClose, id }) {
    const [showData, setShowData] = useState({});

    // fecth //
    const fetchBookById = async () => {
        try {
            const result = await GetRequest(`${API_CONTRACT}/${id}`, 'GET', null);
            setShowData(result);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        if (show) {
            fetchBookById();
        }
    }, [show, id]);
    // --- //

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดสัญญา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='mb-3'>
                            <Card>
                                <Card.Header>ข้อมูลสัญญา</Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เลขที่สัญญา:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.con_number}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เลขที่สัญญาจะซื้อจะขายที่ดิน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.con_numLandSale}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ชื่อพยาน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.witnessone_name}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ชื่อพยาน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.witnesstwo_name}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>จำนวนเงินทำสัญญา:</strong></p>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p className="col-form-label">{parseFloat(showData.con_amount).toLocaleString()}</p>
                                                </div>
                                                <div className='col-md-2 text-end'>
                                                    <p className="col-form-label">บาท</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>วันที่บันทึกข้อมูล:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{DateTimeFormat(showData.con_record)}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>วันที่ทำสัญญา:</strong></p>
                                                </div>
                                                <div className='col-md-6'>

                                                    {showData.con_date !== null ? (
                                                        <p className="col-form-label">{DateTimeFormat(showData.con_date)}</p>
                                                    ) : (
                                                        <p className="col-form-label text-danger">ไม่มีการทำสัญญา</p>
                                                    )}

                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>หมายเหตุ:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.b_note}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <Card.Header>ข้อมูลผู้สัญญา</Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เลขบัตรประจำตัวประชาชน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{FormatThaiNationalID(showData.user_id)}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ชื่อ-นามสกุล:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.user_name} {showData.user_lastname}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ที่อยู่ตามทะเบียนบ้าน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.user_address}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>อายุ:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.user_age}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>สัญชาติ:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.nationality}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เบอร์โทรศัพท์:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.user_phone}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='text-center mb-3'>
                            {showData.image !== '' ? (
                                <Image src={`${API_URL}${showData.image}`} rounded fluid />
                            ) : (
                                <Card>
                                    <Card.Body>
                                        <h1 className='text-center mt-5 mb-5'>ไม่มีรูปภาพที่แสดง</h1>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                        <div>
                            <Card>
                                <Card.Header>ข้อมูลบ้าน</Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>บ้านเลขที่:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.house_no}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>แบบบ้าน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.house_name}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เลขที่โฉนดที่ดิน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.num_deed}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เลขที่หน้าสำรวจ:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.num_survey}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ขนาดพื้นที่ดิน:</strong></p>
                                                </div>
                                                <div className='col-md-2'>
                                                    <p className="col-form-label">{parseFloat(showData.hLand_space).toLocaleString()}</p>
                                                </div>
                                                <div className='col-md-4 text-end'>
                                                    <p className="col-form-label">ตารางวา</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ขนาดพื้นที่ใช้สอย:</strong></p>
                                                </div>
                                                <div className='col-md-2'>
                                                    <p className="col-form-label">{parseFloat(showData.usable_space).toLocaleString()}</p>
                                                </div>
                                                <div className='col-md-4 text-end'>
                                                    <p className="col-form-label">ตารางเมตร</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ราคาบ้านพร้อมที่ดิน:</strong></p>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p className="col-form-label">{parseFloat(showData.price).toLocaleString()}</p>
                                                </div>
                                                <div className='col-md-2 text-end'>
                                                    <p className="col-form-label">บาท</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>หมายเหตุ:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.note}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}