import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore"
import React from "react"
import { database } from "../firebase"
import { AddMessageModel } from "../models/add-message-model"
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import moment from "moment";
import SVG from 'react-inlinesvg';

const MessagePage = (): JSX.Element => {
    const [messages, setMessages] =  React.useState([])
    const [messageForm, setMessageForm] = React.useState<AddMessageModel>(new AddMessageModel())
    const dbInstance = collection(database, 'invitation-message');
    React.useEffect(() => {
        getMessages();
        // db listener
        onSnapshot(dbInstance, (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
                getMessages()
            })
        });
    }, [])

    const getMessages = () => {
        getDocs(dbInstance).then((data) => {
            setMessages(data.docs.map((item) => {
                const avatar = createAvatar(initials, {
                    seed: item.data().name,
                    // ... other options
                    });
                return { ...item.data(), id: item.id, avatar:avatar.toString() }
            }));
        })
    }
    
    async function sendMessage(){
        if(messageForm.name !== '' && messageForm.message !== ''){
            await addDoc(dbInstance, {
                name: messageForm.name,
                message: messageForm.message,
                hadir: messageForm.hadir,
                datePost: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            })
            await setMessageForm(new AddMessageModel())
        }else{
            alert("field belum terisi")
        }
    }
    
    return (
        <div className = "relative mb-24 bg-[#70a878] bg-opacity-70 bg-clip-padding backdrop-filter  backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-2 ">
            <div className = "relative w-full  flex items-center justify-center mb-14  mt-6">
                <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                Kirimkan Pesan
                </p>
                <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/3">
                    <img className = " h-auto" src="./images/dark-blue/line.webp" alt="waktu-dan-tempat" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row p-4">
                <div className = "  md:mr-2 flex flex-col w-full items-center  mb-10  rounded-lg">
                    <div className="mb-6 w-full">
                        <label className="block mb-2 text-sm font-medium text-[#E2DA97]">Nama</label>
                        <input value = {messageForm.name} onChange={(e) => setMessageForm({...messageForm, name: e.target.value})} type="text" id="default-input" className=" bg-[#FFFBE7] border border-gray-300 text-[#8c5d1d] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nama Anda"/>
                    </div>
                    <div className="mb-6 w-full">
                        <label className="block mb-2 text-sm font-medium text-[#E2DA97]">Pesan</label>
                        <textarea value = {messageForm.message} onChange={(e) => setMessageForm({...messageForm, message: e.target.value})} id="message" rows={4} className="block p-2.5 w-full text-sm text-[#8c5d1d] bg-[#FFFBE7] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Tinggalkan pesan anda"></textarea>
                    </div>
                    <div className="mb-6 w-full">
                        <div onClick={() => (messageForm.name !== '' && messageForm.message !== '') && sendMessage()} className = {`${(messageForm.name !== '' && messageForm.message !== '') ? 'bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] text-white' : 'bg-[#568161] text-gray-400'} p-2 rounded-full text-center `}>
                            {(messageForm.name !== '' && messageForm.message !== '') ? 'Kirim' : 'Sampaikan Pesanmu'}
                        </div>
                    </div>
                </div>
                <div className = "rounded-xl md:ml-2 px-3 py-3 w-full h-72 flex ">
                    <div className = " overflow-y-scroll flex flex-col w-full h-full items-center mb-10  rounded-lg">
                        {messages.map((obj) => {
                            return (
                                <div key = {obj.id} className = "flex w-full py-2 ">
                                    <div className = "flex items-center justify-center flex-shrink-0 mr-3">
                                        <div className = "bg-gradient-to-t from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-7 h-7 md:w-10 md:h-10 rounded-full">
                                            <div className = "text-gray-600">
                                                <SVG className = "flex object-cover rounded-full " src={obj.avatar} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className = " w-full p-3 rounded-tl-xl rounded-br-xl bg-[#FFFBE7] leading-relaxed">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-2 mb-4">
                                            <strong className = "text-sm text-[#8c5d1d]"> {obj.name}</strong> 
                                            <span className = "text-xs text-[#8c5d1d]">{moment(obj.datePost).format('D MMMM YYYY, HH:mm')}</span>
                                        </div>
                                        <p className = "text-xs text-[#8c5d1d]">
                                            {obj.message}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagePage