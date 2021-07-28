import React from 'react'
import './featureInfo.css'
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { ReactTypical } from '@deadcoder0904/react-typical'

export default function FeatureInfo() {
    return (
        <div className="featured">
        {/* <div className="featuredItem"> */}
          {/* <span className="featuredTitle">Revanue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,415</span>
            <span className="featuredMoneyRate">
              -11.4 <ArrowDownward  className="featuredIcon negative"/>
            </span>
          </div> */}
          {/* <span className="featuredSub">Compared to last month</span> */}
          {/* <img src={process.env.PUBLIC_URL + 'boston_logo.png'} alt="Logo" height="97px" width="129px"/>
        </div> */}
        <div className="featuredItem">
            <center>
                {/* <span className="featuredTitle"><ReactTypical
                    steps={['BOSTON DYNAMICS', 4000,'Computer Science & Information Technology', 4000,'University of Missouri', 4000]}
                    loop={Infinity}
                    wrapper="div"  
                /></span> */}
                <span className="featuredTitle"><ReactTypical
                    steps={['BOSTON DYNAMICS', 4000]}
                    loop={Infinity}
                    wrapper="div"  
                /></span>
                <br></br>
                <img src={process.env.PUBLIC_URL + 'boston_logo.png'} alt="Logo" height="97px" width="129px"/>
                <br></br>
                <br></br>
                <span className="featuredTitle"><ReactTypical
                    steps={['Computer Science & Information Technology', 4000]}
                    loop={Infinity}
                    wrapper="div"  
                /></span>
                
                <br></br>
                <img src={process.env.PUBLIC_URL + 'mizzou_logo.png'} alt="Logo" height="97px" width="129px"/>
                <br></br>
                <br></br>
                <span className="featuredTitle"><ReactTypical
                    steps={['University of Missouri', 4000]}
                    loop={Infinity}
                    wrapper="div"  
                /></span>
            </center>
        </div>
        {/* <div className="featuredItem"> */}
          {/* <span className="featuredTitle">Cost</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,225</span>
            <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon"/>
            </span>
          </div> */}
          {/* <span className="featuredSub">Compared to last month</span> */}
          {/* <img src={process.env.PUBLIC_URL + 'mizzou_logo.png'} alt="Logo" height="97px" width="129px"/>
        </div> */}
      </div>
    )
}
