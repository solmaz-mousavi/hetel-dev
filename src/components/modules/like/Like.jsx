import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Like({liked , likeHandler, likedCount}) {
	const [like, setLike] = useState(liked);
	// const likeHandler = () => {
	// 	setLike(prev => !prev);






	// }
	return (
		<div
		className="heart"
		onClick={()=>{likeHandler(!liked);
			setLike(prev => !prev);
		}}
	>
		{like ? <FaHeart /> : <FaRegHeart />}
		<span>{likedCount===0 ? "" : likedCount}</span>
	</div>
	)
}

export default Like