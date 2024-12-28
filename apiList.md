AuthRouter
- post  /login
- post /signup
- post /logout

connectionRequestController
- post request/send/interested/:userId
- post request/send/ignore/:userId
- post request/review/accepted/:requestId
- post request/review/rejected/:requestId


userRouter
- get user/feed
- get user/connection
- get user/request

profileRouter
- get profile/view
- patch profile/edit
- patch profile/password
