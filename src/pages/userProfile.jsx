import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadOrders } from "../store/actions/order.actions.js"
import { store } from "../store/store.js"
import { Link } from "react-router-dom"
import { SellerOrdersList } from "../cmps/SellerOrderList.jsx"

export function UserProfile() {

  const orders = useSelector(storeState => storeState.orderModule.orders)

  useEffect(() => {
    loadOrders(true)
  }, [])


  if (!orders) return <div>Loading..</div>
  return (
    <main className="main-container">
      <main className="user-details-container main-layout">
        <section className="details-container">
          <section className="user-details">
            <div className="user-card">
              <div className="user-profile-info"></div>
            </div>
            <div className="desc-card">

            </div>
          </section>
          <section className="gigs-column user-details-layout">
            {orders.length !== 0 ? (
              <div className="manage-orders">
                <div className="order-header flex">
                  <h1>Manage Orders</h1>
                </div>
                <section>
                  <SellerOrdersList orders={orders} />
                </section>
                <div></div>
              </div>
            ) : (
              <div>
                <p>No orders to approve!</p>
              </div>
            )}
          </section>
        </section>
      </main>
    </main>
  )
  // return (
  //   <main className="main-container">
  //     <section className="buyer-orders-container full">
  //       <div className="buyer-orders main-container">
  //         <div className="user-orders">
  //           <h1 className="header">Manage Orders</h1>
  //         </div>
  //         {orders.length !== 0 ? (
  //           <section className="orders-layout">
  //             {orders.map(order => {
  //               // Calculate due date dynamically
  //               const orderDate = new Date(order.orderDate)
  //               const dueDate = new Date(orderDate)
  //               dueDate.setDate(dueDate.getDate() + order.gig.daysToMake)
  //               const formattedDueDate = dueDate.toLocaleString("default", {
  //                 month: "short",
  //                 day: "numeric",
  //                 year: "numeric",
  //               })

  //               return (
  //                 <section className="order-card-container flex" key={order._id}>
  //                   <div className="order-info">
  //                     <h5 className="card-header">Order status</h5>
  //                     <h4 className="status flex pending">{order.status}</h4>
  //                     <p className="date">Due date on {formattedDueDate}</p>
  //                     <div className="progress-bar">
  //                       <div className="progress progress-25" style={{ width: "25%" }}></div>
  //                     </div>
  //                   </div>
  //                   <div className="gig flex">
  //                     <div className="gig-img">
  //                       <img src={order.gig.imgUrl} alt="Gig Picture" />
  //                     </div>
  //                     <div className="gig-info">
  //                       <h4 className="gig-title">{order.gig.title}</h4>
  //                       <h5>{order.gig.tags[0]}</h5>
  //                       <h5 className="seller">
  //                         From <span className="click">{order.seller.fullname}</span>
  //                       </h5>
  //                     </div>
  //                   </div>
  //                   <div className="order-data">
  //                     <div className="order">
  //                       <h3>Order no.</h3>
  //                       <h3># {order.gig._id} </h3>
  //                     </div>
  //                     <div className="order">
  //                       <h3>Delivery time</h3>
  //                       <h3>{order.gig.daysToMake} DAYS</h3>
  //                     </div>
  //                   </div>
  //                 </section>
  //               )
  //             })}
  //           </section>
  //         ) : (
  //           <div>
  //             <p>No orders  To Manage yet</p>                              
  //           </div>
  //         )}
  //       </div>
  //     </section>
  //   </main>
  // )
}
