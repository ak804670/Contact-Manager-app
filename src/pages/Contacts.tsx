import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import ModalForm from '../components/ModalForm';
import { ContactProps, RootState } from '../globalfiles/GlobalInterface';
import { deleteUser } from '../globalfiles/ContactReducer';

const Contacts = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ContactProps>({
        firstName: '',
        lastName: '',
        status: '',
        id: 0,
    })

    const dispatch = useDispatch();

    const [modalStatus, setModalStatus] = useState<string>('');

    const userContact = useSelector((state: RootState) => state.users);

    const onUpdateCardClickResponse = (choice: boolean, index: number, object: ContactProps) => {
        setShowModal(choice)
        setModalData(object)
        setModalStatus("EDIT")
    }

    const onAddCardClickResponse = (choice: boolean) => {
        setShowModal(choice)
        setModalData({
            firstName: '',
            lastName: '',
            status: '',
            id: 0,
        })
        setModalStatus("CREATE")
    }

    const deleteOnClick = (id: number) => {
        dispatch(deleteUser({ id: id }))
    }

    return (
        <>

            <div className='mb-4  top-0 w-fit cursor-pointer' onClick={() => onAddCardClickResponse(true)}>
                <svg width="2rem" height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" fill="white" width="24" height="24" />
                    <g>
                        <path d="M21 14v5c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h5v2H5v14h14v-5h2z" />
                        <path d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4" />
                    </g>
                </svg>
            </div>
            {userContact.length===0 ? <h3>add somthing</h3> : 
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
               
                {userContact.map((contact, index) => (
                    <Card key={index} object={contact} toggleModal={(choice: boolean) => onUpdateCardClickResponse(choice, index, contact)} deleteUser={() => deleteOnClick(contact.id)} />
                ))}
            </div> }
            {
                showModal && <ModalForm toggleModal={(choice: boolean) => setShowModal(choice)} modalData={modalData} modalStatus={modalStatus} />
            }
        </>

    )
}

export default Contacts
