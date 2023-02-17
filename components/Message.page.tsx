import { addDoc, collection, doc, FieldValue, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import React from "react"
import { database } from "../firebase"
import { AddMessageModel } from "../models/add-message-model"
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import moment from "moment";
import SVG from 'react-inlinesvg';
import { MessageProps } from "../types/message-props";

const MessagePage = ({ guest }: MessageProps): JSX.Element => {
    const [messages, setMessages] =  React.useState([])
    const [messageForm, setMessageForm] = React.useState<AddMessageModel>(new AddMessageModel())
    const dbInstance = collection(database, 'invitation-message');
    const [reserved, setReserved] = React.useState<boolean>(false)
    const [present, setPresent] = React.useState<number>(0)
    const [absent, setAbsent] = React.useState<number>(0)
     
    // const q = query (dbInstance, orderBy("timestamp","desc"), limit(2));
    const q = query (dbInstance, orderBy("timestamp","desc"));

    React.useEffect(() => {
        getMessages();
        // db listener
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
                getMessages()
            })
        });
        setMessageForm({...messageForm, name: guest})
    }, [])

    const getMessages = async() => {
        let present = 0
        let absent = 0
        await getDocs(q).then((data) => {
            setMessages(data.docs.map((item) => {
                if(item.data().hadir){
                    present += 1
                }else{
                    absent += 1
                }
                const avatar = createAvatar(initials, {
                    seed: item.data().name,
                    // ... other options
                    });
                return { ...item.data(), id: item.id, avatar:avatar.toString() }
            }));
        })
        await setPresent(present)
        await setAbsent(absent)

    }
    
    async function sendMessage(){
        // one device one message checking. 
        if(localStorage.getItem("fingerprint")){
            let fingerprint = await localStorage.getItem("fingerprint")
            // firebase checking
            const existMessage = await doc(dbInstance,fingerprint);
            if(!(await getDoc(existMessage)).data()){
                // refreshing message identifier when have localstorage data but data not found on firestore
                await localStorage.removeItem("fingerprint");
                await sending()
            }else{
                setReserved(true)
                const timer = setTimeout(() => {
                    setReserved(false);
                }, 3000);
                return () => clearTimeout(timer);
                
            }
        }else{
            await sending()
        }

        
    }

    async function sending () {
        if(messageForm.name !== '' && messageForm.message !== ''){
            const docIdentifier = await addDoc(dbInstance, {
                name: messageForm.name,
                message: messageForm.message,
                hadir: messageForm.hadir,
                datePost: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                timestamp: serverTimestamp(),
            })
            localStorage.setItem('fingerprint',docIdentifier.id)
            await setMessageForm(new AddMessageModel())
        }else{
            alert("field belum terisi")
        }
    }
    
    return (
        <div className = "relative mb-24 bg-[#70a878] bg-opacity-70 bg-clip-padding backdrop-filter  backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-2 ">
            <div className = "relative w-full  flex flex-col items-center justify-center mb-14  mt-6">
                <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                RSVP
                </p>
                <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/3">
                    <img className = " h-auto" src="./images/dark-blue/line.webp" alt="waktu-dan-tempat" />
                </div>
                <div className = "flex flex-row space-x-4 mt-5">
                    <div className = "text-green-200 flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                        <p className = "text-[#E2DA97] ml-1"> Hadir : {present}</p>
                    </div>
                    <div className = "text-red-200 flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className = "text-[#E2DA97] ml-1"> Tidak Hadir : {absent}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row p-4">
                <div className = "  md:mr-2 flex flex-col w-full items-center  mb-10  rounded-lg">
                    <div className="mb-6 w-full">
                        <label className="block mb-2 text-sm font-medium text-[#E2DA97]">Nama</label>
                        <input value = {messageForm.name} onChange={(e) => setMessageForm({...messageForm, name: e.target.value})} type="text" id="default-input" className=" bg-[#FFFBE7] border border-gray-300 text-[#8c5d1d] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nama Anda"/>
                    </div>
                    <div className="mb-6 w-full">
                        <label className="block mb-2 text-sm font-medium text-[#E2DA97]">Ucapan dan Doa</label>
                        <textarea value = {messageForm.message} onChange={(e) => setMessageForm({...messageForm, message: e.target.value})} id="message" rows={4} className="block p-2.5 w-full text-sm text-[#8c5d1d] bg-[#FFFBE7] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Tinggalkan pesan anda"></textarea>
                    </div>
                    <div className="mb-6 w-full">
                        <label className="block mb-2 text-sm font-medium text-[#E2DA97]">Apakah Anda Berkenan Hadir ?</label>
                        <label  className="z-0 inline-flex relative items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={messageForm.hadir}
                                onChange={(e) => setMessageForm({...messageForm, hadir: e.target.checked})}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-[#E2DA97] dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#E2DA97]"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{messageForm.hadir ? 'Ya' : 'Tidak'}</span>
                        </label>
                    </div>
                    <div className="mb-6 w-full">
                        <p className = {`${!reserved && 'hidden'} mb-3 text-center text-xs text-red-300`}>Maaf, Anda telah melakukan RSVP</p>
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
                                            <span className = "flex items-center text-xs text-[#8c5d1d]">
                                                {obj.hadir ? (
                                                    <div className = "text-green-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                                        </svg>
                                                    </div>
                                                ):(
                                                    <div className="text-red-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                )}

                                                {moment(obj.datePost).format('D MMMM YYYY, HH:mm')}
                                            </span>
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