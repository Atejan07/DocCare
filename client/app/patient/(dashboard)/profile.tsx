import "./profile.css";

export default function Profile() {
  return (
    <main>
      <div className="profile">
        <div className="about-patient">
          <div className="profile-pic">
            <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
          </div>
          <h1>Michaela Hans</h1>
          <p>36 years old</p>
          </div>
          <div className="general-info">
            <h2>General info:</h2>
            <p>Date of birth: 1985, January 13</p>
            <p>Female</p>
          </div>
          <div className="ilnesses">
          <h3>Illnesses:</h3>
          <div className="each-illness">
            <div>
            Anxiety
            </div>
            <div>
            Depression
            </div>
          </div>
          <div className="checkup">
           <h4>Last Checkup:</h4>
           <div className="checkup-container">
           <p className="date">19/07/2022</p>
           <div className="doctor-notes">
           <p>Doctors Notes:</p>
           <p>Yoga and streches once a week</p>
           </div>
           </div>
          </div>
          </div>
      </div>
    </main>
  );
}