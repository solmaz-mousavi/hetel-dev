import { useContext } from "react";
import "./status.css";
import { StaticDataContext } from "../../../contexts/StaticDataContext";
import Aos from "../../modules/aos/Aos";
import CounterUp from "../../modules/countUp/CounterUp";

function Status() {
			const { staticData } = useContext(StaticDataContext);
	return (
				<section className="status-wrapper">
					<div className="container status-container">
						{staticData?.status &&
							staticData.status.map((item) => (
								<Aos aosStyle="fadeInUp" once={true} key={item.id}>
											<div className="status-item">
												<img src={item.image} alt={item.title} className="status-image" />
													<h4 className="status-title">{item.title}</h4>
												<div className="status-details">
													<div className="status-count">

														<CounterUp end={item.number} once={true}  />
													</div>
														<p className="status-desc">{item.unit}</p>
													
												</div>
											</div>
								</Aos>
							))}
					</div>
				</section>
	)
}

export default Status