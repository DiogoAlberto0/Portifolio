import { useState } from 'react'
import './Carousel.css'


const Carousel = props => {

    const images = props.images

    const [ index, setIndex ] = useState(Number)

    const choseImage = (index, images) => {
        return images[index]
    }


    function addIndex(index, images) {
        if(index < images.length - 1){
            console.log(images.length)
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    }
    function rmvIndex(index, images) {
        if(index ){
            console.log(images.length)
            setIndex(index - 1)
        } else {
            setIndex(images.length - 1)
        }
    }
    return(
        <div className={`carousel-background ${props.secondaryClass}`}>
            <i className="fas fa-arrow-left fa-2x" onClick={e => rmvIndex(index, images)}></i>
            {choseImage(index, images)}
            <i className="fas fa-arrow-right fa-2x" onClick={e => addIndex(index, images)}></i>
        </div>
    )
}



export default Carousel