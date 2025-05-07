import "./pageHeader.css";
import Aos from "../modules/aos/Aos";

function PageHeader({ title }) {
	return (
				<div className="page-header">
					<Aos aosStyle="fadeInDown" once={true}>
						<p className="page-header-desc">{title}</p>
					</Aos>
				</div>
	)
}

export default PageHeader