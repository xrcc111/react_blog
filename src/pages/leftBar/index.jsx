import React, {useState, useEffect} from 'react'
import { Tag } from 'antd'
import {querySiteInfo, getAllTags, getClientInfo} from '../../api/index'
import { setRandColor } from '../../utils/help'
import { useDispatch } from 'react-redux/es/exports'
import { handleLabelId } from '../../store/modules/article'
import { useNavigate } from "react-router-dom"
import "./index.css"

export default function LeftBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [nums, setNums] = useState({})
  const [tags, setTags] = useState([])

  useEffect(() => {
   async function _getSiteInfo() {
    const result = await querySiteInfo()
    if(result.code === 200) {
      const {data} = result
      setNums(data)
    }
  }
  const _getAllTags = async () => {
    const result = await getAllTags()
    if(result.code === 200) {
      const {data} = result
      setTags(data)
    }
  }

  const _getClientInfo = async () => {
    const result = await getClientInfo()
    return result
  }
  _getSiteInfo()
  _getAllTags()
  _getClientInfo()
  },[])

  const handleClick = (labelId) =>{
    dispatch(handleLabelId(labelId))
    navigate('/home', { replace: true, })
  }

  return (
    <div className='left-bar'>
      <div className='is-center'>
        <div className='avatar-img'>
          <img style={{width:'100%'}} src="https://cdn.xrblogs.cn/avatar.jpg" alt="" />
        </div>
        <div className='author-info__name'>劲夫</div>
        <div className='author-info__description'>Never Give Up</div>
      </div>
      <div className='site-data'>
        <div className='article-nums'>
          <div>文章</div>
          <div className='counts'>{nums.articles}</div>
        </div>
        <div className='label-nums'>
          <div>标签</div>
          <div className='counts'>{nums.labels}</div>
        </div>
        <div className='message-nums'>
          <div>评论</div>
          <div className='counts'>{nums.messages}</div>
        </div>
      </div>

      <div className='tags'>
        <div className='title'>
          <span>标签</span>
        </div>
        <div className='all-tags'>
         {
           tags.map( i => <div key={i.label_id} className='tag-tiem'>
            <Tag onClick={() => handleClick(i.label_id)} style={{fontSize:'14px', padding: '6px', cursor:'pointer'}} color={setRandColor()}>{i.label_name}</Tag>
           </div>)
         }
        </div>
      </div>
    </div>
  )
}
