import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoomsQuery } from "../../app/services/roomApi";
import { useGetRoomReservationsQuery } from "../../app/services/roomReservationApi";
import {
  filterByNameOutputByOneItem,
  filterByID,
} from "../../utils/filterMethods";
import {
  requiredDateValidator,
  requiredNumberValidator,
} from "../../validators/rules";
import { FaCartPlus } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import Form from "../../components/form/Form";
import Pagination from "../../components/templates/pagination2/Pagination"
import { addToRoomCart } from "../../utils/addToCart";
import { StaticDataContext } from "../../contexts/StaticDataContext";
import { AuthContext } from "../../contexts/AuthContext";
import { getDateArray } from "../../utils/getDateArray";
import "./roomSearch.css";
import RoomThumb from "../../components/modules/roomThumb/RoomThumb";
import NoDataToShow from "../../components/templates/noDataToShow/NoDataToShow";

export default function RoomSearch() {

  // const { staticData } = useContext(StaticDataContext);
  // const { userInfo } = useContext(AuthContext);
  const { data: rooms } = useGetRoomsQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const [searchResults, setSearchResults] = useState([]);
	const [showResults, setShowResults] = useState(false);
const perPage = 3;


  const inputs = [
    {
      tag: "date",
      name: "enterDate",
      type: "text",
      label: "تاریخ ورود",
      validators: [requiredDateValidator()],
      initialValue: "",
    },
    {
      tag: "date",
      name: "exitDate",
      type: "text",
      label: "تاریخ خروج",
      validators: [requiredDateValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "strength",
      type: "number",
      label: "تعداد نفرات",
      validators: [requiredNumberValidator()],
      initialValue: 1,
    },
  ];
  const buttons = [
    {
      title: "مشاهده اتاق های خالی",
      type: "submit",
      className: "btn btn-gold btn-lg",
    },
  ];
  const submitHandler = async (items) => {
		const { strength, enterDate, exitDate } = items;
    // setEnterDate(enterDate);
    // setExitDate(exitDate);
    // setRequestDates(getDateArray(enterDate, exitDate));
		
    const reqDates = getDateArray(enterDate, exitDate);
    const reservedRoomIDs = filterByNameOutputByOneItem(
      roomReservations,
      "date",
      reqDates,
      "roomID"
    );
		
    // const roomInfo = [...rooms];
    // const filteredrooms = roomInfo.filter((room) => {
    //   const { id, capacity, maxAddedPeople } = room;
    //   return (
			//     Number(strength) <= capacity + maxAddedPeople &&
			//     !reservedRoomIDs.includes(id)
			//   );
			// });
			
			setSearchResults(
				[...rooms].filter(({ id, capacity, maxAddedPeople }) => 
        Number(strength) <= capacity + maxAddedPeople &&
          !reservedRoomIDs.includes(id)
      )
    );
		setShowResults(true);
		setFormInfo({...items}, reqDates);



    // const products = filteredrooms.map((room) => {
    //   const {
    //     id,
    //     roomNumber,
    //     floor,
    //     roomTypeID,
    //     roomViewID,
    //     price,
    //     pricePerAddedPerson,
    //     score,
    //     images,
    //   } = room;
    //   const roomType = filterByID(staticData.roomTypes, roomTypeID)[0].title;
    //   const roomView = filterByID(staticData.roomViews, roomViewID)[0].title;
    //   const title = `اتاق ${roomType} با منظره ${roomView}`;
    //   const totalPrice = price + strength * pricePerAddedPerson;

    //   return { id, title, roomNumber, floor, totalPrice, images, score };
    // });

    // setreservableRooms(products);
    
  };


		const [startIndex, setStartIndex] = useState(0);

			const [view, setView] = useState("grid");
  const [formInfo, setFormInfo] = useState(null);
  // const [enterDate, setEnterDate] = useState(null);
  // const [exitDate, setExitDate] = useState(null);
  // const [requestDates, setRequestDates] = useState([]);
 	// useEffect(() => {
	// 	 window.document.scrollTo(0, 350);
	//  }, [startIndex]);

  // const [reservableRooms, setreservableRooms] = useState([]);

  // if (roomReservationsIsLoading || roomsIsLoading) {
  //   return <CircleSpinner />;
  // }

  // if (roomReservationsError || roomsError) {
  //   return (
  //     <div className="error">
  //       <MdErrorOutline />
  //       <p>{roomReservationsError.error + roomsError.error}</p>
  //     </div>
  //   );
  // }

  // const title = ["عنوان", "شماره", "طبقه", "قیمت هر شب اقامت (تومان)"];

  // let body = [];
  // let img = [];
  // if (reservableRooms) {
  //   reservableRooms.forEach((room) => {
  //     const { title, roomNumber, floor, totalPrice, images } = room;
  //     let newItem = {
  //       tableData: [
  //         title,
  //         roomNumber,
  //         floor,
  //         `${totalPrice.toLocaleString()} تومان`,
  //       ],
  //       payload: room,
  //     };
  //     body = [...body, newItem];
  //     img = [...img, images];
  //   });
  // }

  // const detailHandler = (roomInfo) => {
  //   navigate(`/aseman-hotel/roomDetails/${roomInfo.id}?strength=${strength}`);
  // };



  return (
    <div className="search-container main-wrapper" >
      <h1 className="page-header-desc ">
        اطلاعاتت رو وارد کن تا بتونی اتاق های خالی رو ببینی
      </h1>

        <Form
          inputs={inputs}
          buttons={buttons}
          submitHandler={submitHandler}
        ></Form>


<div className="results-wrapper grid" >

<div className="container results-container">

{showResults && searchResults.length === 0 ? <NoDataToShow /> : searchResults?.slice(startIndex, startIndex + perPage).map(item => 



<RoomThumb room={{...item}} viewStyle="grid" formInfo={formInfo} key={item.id} />
) }


	
</div>

				{searchResults.length > 0 && (
					<div className="pagination-wrapper">
						<Pagination
							dataLength={searchResults.length}
							perPage={perPage}
							startIndex={startIndex}
							setStartIndex={setStartIndex}
						/>
					</div>
				)}



</div>
        {/* {showResults && (
          <div className="search-bottom">
            <Pagination
              title={title}
              body={body}
              actions={actions}
              photoes={img}
            />
          </div>
        )} */}
      </div>
  );
}
