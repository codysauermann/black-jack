import ace from '../assests/cardimages/ace_of_spades.png'
import two from '../assests/cardimages/2_of_clubs.png'
import three from '../assests/cardimages/3_of_diamonds.png'
import four from '../assests/cardimages/4_of_hearts.png'
import five from '../assests/cardimages/5_of_spades.png'
import six from '../assests/cardimages/6_of_clubs.png'
import seven from '../assests/cardimages/7_of_diamonds.png'
import eight from '../assests/cardimages/8_of_hearts.png'
import nine from '../assests/cardimages/9_of_spades.png'
import ten from '../assests/cardimages/10_of_clubs.png'
import jack from '../assests/cardimages/jack_of_diamonds2.png'
import queen from '../assests/cardimages/queen_of_hearts2.png'
import king from '../assests/cardimages/king_of_spades2.png'

const cards = [ace, two, three, four, five, six, seven, eight, nine, ten, jack, queen, king];
function CardFace(props) {
    var idx = props.cardNum;
    return(
        <img className='h-60 rounded-xl shadow-xl' src={cards[idx - 1]} alt={idx} />
    )
}

export default CardFace;