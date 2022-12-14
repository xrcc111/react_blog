import React, { useState } from 'react'
import { Avatar} from 'antd';
import AddComment from '../AddComment';
import {parseTime} from '../../utils/help'
import './index.less'

export default function MessageItem(props) {
  const {item} = props
  const [showReplyForm, setShowReplyForm] = useState(false);
  // 点击回复做处理
  const hanleReplyForm = () => {
    setShowReplyForm(true);
  };
  // 作递归
  const recursiveMessage = (item.children || []).map((el, i) => {
    return (
      <MessageItem
      item = {el}
      key = {i}
      />
    )
  })
  return (
    <div className='message-ls'>
    <div className='message-item'>
      <div className='profile'>
      <Avatar
        shape="circle" size={45}
        src={item.qq}
        />
        <div className='username'>
          {
          item.qq==='http://q.qlogo.cn/headimg_dl?dst_uin=1194150512@qq.com&spec=100' ? '原来是小何鸭': item.nickname}
        </div>
      </div>
      <div className='comment-detail'>
        <span className='timer'>{parseTime(item.create_time)}</span>
        <div className='comment-content' dangerouslySetInnerHTML={{__html: item.message}}>
        </div>
      </div>
      {
        !showReplyForm ? (<p className='reply' onClick={ hanleReplyForm }>回复</p >)
        :
        (<div className='reply-form'>
          <AddComment 
            handleRelpy = {(visible) => {setShowReplyForm(visible)}} 
            parentId= {item.id}
            />         
        </div>)
      }
    </div>
    <div style={{ marginLeft: '50px' }}>{recursiveMessage}</div>
    </div>
  )
}
