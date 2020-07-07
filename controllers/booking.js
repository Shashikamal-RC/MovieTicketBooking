const Booking = require("../models/booking")
const { isSeatsAvailable } = require("../controllers/screen");
const nodemailer = require("nodemailer");

exports.getBookingById = (req, res, next, id) => {
    Booking.findById(id).exec((error, booking) => {
        if(error || !booking){
            return res.status(400).json({
                error: "Booking not found id DB"
            })
        }
        req.booking = booking;
        next();
    })
};


exports.createBooking = (req, res) =>  {
    const Booking_data = new Booking(req.body);
    const { theatreId, screenId } = req.params;
    const screen = req.screen

    // check availability of seats
    req.seats = Booking_data.seat_numbers;
    const isSeatsAvailabe = isSeatsAvailable(req, res);

    if(!isSeatsAvailabe){
        return res.status(400).json({
            error: "Sorry! Seats ypu are looking for are not available"
        })
    }

    Booking_data.theatre_id = theatreId
    Booking_data.screen_id = screenId

    for( var i=0;i<Booking_data.seat_numbers.length ; i++ ) {
        screen.booked_seats.push(Booking_data.seat_numbers[i]);
    }
    

    console.log(screen.booked_seats, Booking_data.seat_numbers,"seats data ");
    screen.save((error, screen) => {
        if(error){
            return res.status(400).json({
                error: "Error in updating booked seats"
            })
        }
    })

    Booking_data.save((error, booking) => {
        if(error){
            return res.status(400).json({
                error: "Not able to save Booking in DB",
                data : error
            })
        }
        sendMail(req.profile.email);
        // res.json({booking});
    })
};


exports.getBooking = (req,res) => {
    return res.json(req.booking)
};

exports.getAllBooking = (req, res) => {
    Booking.find().exec((error, bookings) => {
        if(error || !bookings){
            return res.status(400).json({
                error: "No Booking found"
            })
        }
        res.json(bookings);
    })
};

sendMail = (email) => {
    console.log("email : ",email)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Movie Booking Status',
        text: 'Booking successful!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            return res.status(200).json({
                message : "Booking successful"
            })
        }
      });
}