import axios from "axios";

const buildingData = [
    {
      name: "Toà nhà Sunrise",
      position: "Phía Đông Bắc"
    },
    {
      name: "Toà nhà Central Plaza",
      position: "Phía Tây Bắc"
    },
    {
      name: "Toà nhà Diamond Tower",
      position: "Phía Tây Nam"
    },
    {
      name: "Toà nhà Sun Tower",
      position: "Phía Nam"
    },
    {
      name: "Toà nhà Victoria Tower",
      position: "Phía Đông Nam"
    },
    {
      name: "Toà nhà Galaxy Center",
      position: "Phía Tây"
    },
    {
      name: "Toà nhà Elegance Tower",
      position: "Phía Đông"
    },
    {
      name: "Toà nhà Elite Building",
      position: "Phía Bắc"
    },
    {
      name: "Toà nhà Metropolitan Tower",
      position: "Trung tâm"
    },
    {
      name: "Toà nhà Zenith Tower",
      position: "Phía Bắc Đông"
    }
];
  
const gateData = [
    {
        name: "string",
        category: "IN"
    },
    {
        name: "Cổng chính",
        category: "IN"
    },
    {
        name: "Cổng ra số 1",
        category: "OUT"
    },
    {
        name: "Cổng phụ tầng 2",
        category: "IN"
    },
    {
        name: "Cổng đối diện bãi đỗ xe",
        category: "OUT"
    },
    {
        name: "Cổng bên cạnh nhà hàng",
        category: "IN"
    },
    {
        name: "Cổng ra khu vực hồ bơi",
        category: "OUT"
    }
];

const generatePhoneNumber = () => {
    const phoneNumber =
      "0" +
      Math.floor(Math.random() * 10000000000)
        .toString()
        .padStart(10, "0");
    return phoneNumber;
};

function generateRoom(rooms){
    for (let i = 1; i <= 6; i++) {
        for(let j = 1; j <= 5; j++){
            const room = {
                number: i*100+j,
                image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600"
            };
            rooms.push(room);
        }
    }
    return rooms;
}

const memberUsers = [
    {
        name: "Hoàng Văn Hải",
        gender: "Nam"
    },
    {
        name: "Nguyễn Thị Bình",
        gender: "Nữ"
    },
    {
        name: "Trần Văn Anh",
        gender: "Nam"
    },
    {
        name: "Lê Thị Thảo",
        gender: "Nữ"
    },
    {
        name: "Phạm Văn Đức",
        gender: "Nam"
    },
    {
        name: "Vũ Thị Hà",
        gender: "Nữ"
    },
    {
        name: "Đặng Văn Bình",
        gender: "Nam"
    },
    {
        name: "Hồ Thị Hương",
        gender: "Nữ"
    },
    {
        name: "Bùi Văn Trung",
        gender: "Nam"
    },
    {
        name: "Nguyễn Thị Ngọc",
        gender: "Nữ"
    },
    {
        name: "Trịnh Văn Hòa",
        gender: "Nam"
    },
    {
        name: "Lại Thị Quỳnh",
        gender: "Nữ"
    },
    {
        name: "Phan Văn Duy",
        gender: "Nam"
    },
    {
        name: "Mai Thị Minh",
        gender: "Nữ"
    },
    {
        name: "Ngô Văn Tú",
        gender: "Nam"
    },
    {
        name: "Hà Thị Loan",
        gender: "Nữ"
    },
    {
        name: "Đỗ Văn Hùng",
        gender: "Nam"
    },
    {
        name: "Võ Thị Lan",
        gender: "Nữ"
    },
    {
        name: "Lê Thành Đông",
        gender: "Nam"
    },
    {
        name: "Nguyễn Thị Ngân",
        gender: "Nữ"
    },
    {
        name: "Trần Văn Lợi",
        gender: "Nam"
    },
    {
        name: "Hoàng Thị Phương",
        gender: "Nữ"
    },
    {
        name: "Phạm Văn Tuấn",
        gender: "Nam"
    },
    {
        name: "Lý Thị Hà",
        gender: "Nữ"
    },
    {
        name: "Vũ Văn Khôi",
        gender: "Nam"
    },
    {
        name: "Đặng Thị Thủy",
        gender: "Nữ"
    },
    {
        name: "Nguyễn Văn Dũng",
        gender: "Nam"
    },
    {
        name: "Lê Thị Quế",
        gender: "Nữ"
    },
    {
        name: "Trương Văn Thành",
        gender: "Nam"
    },
    {
        name: "Nguyễn Thị Kim",
        gender: "Nữ"
    },
    {
        name: "Phan Văn Khai",
        gender: "Nam"
    },
    {
        name: "Vũ Thị Thanh",
        gender: "Nữ"
    },
    {
        name: "Hoàng Văn Hòa",
        gender: "Nam"
    },
    {
        name: "Lý Thị Hương",
        gender: "Nữ"
    },
    {
        name: "Trần Văn Tùng",
        gender: "Nam"
    },
    {
        name: "Nguyễn Thị Hà",
        gender: "Nữ"
    },
    {
        name: "Bùi Văn Hùng",
        gender: "Nam"
    },
    {
        name: "Võ Thị Lan Anh",
        gender: "Nữ"
    },
    {
        name: "Lại Văn Thắng",
        gender: "Nam"
    },
    {
        name: "Phạm Thị Hương",
        gender: "Nữ"
    }
];

const gateKeepers = [
    {
        name: "Nguyễn Văn An",
        gender: "Nam"
    },
    {
        name: "Trần Thị Bích",
        gender: "Nữ"
    },
    {
        name: "Lê Văn Cường",
        gender: "Nam"
    },
    {
        name: "Phạm Thị Dung",
        gender: "Nữ"
    },
    {
        name: "Vũ Văn Hòa",
        gender: "Nam"
    },
    {
        name: "Đặng Thị Hương",
        gender: "Nữ"
    },
    {
        name: "Hoàng Văn Đạo",
        gender: "Nam"
    },
    {
        name: "Ngô Thị Hà",
        gender: "Nữ"
    },
    {
        name: "Bùi Văn Đức",
        gender: "Nam"
    },
    {
        name: "Mai Thị Hằng",
        gender: "Nữ"
    },
    {
        name: "Trịnh Văn Tâm",
        gender: "Nam"
    },
    {
        name: "Nguyễn Thị Ngọc",
        gender: "Nữ"
    },
    {
        name: "Lại Văn Trung",
        gender: "Nam"
    },
    {
        name: "Phan Thị Lan",
        gender: "Nữ"
    },
    {
        name: "Võ Văn Hoàng",
        gender: "Nam"
    },
    {
        name: "Hà Thị Quỳnh",
        gender: "Nữ"
    },
    {
        name: "Đỗ Văn Thắng",
        gender: "Nam"
    },
    {
        name: "Trương Thị Anh",
        gender: "Nữ"
    }
];

const services = [
    {
        name: "Dịch vụ tắm suối nước nóng",
        price: 200000,
        image: "https://ik.imagekit.io/tvlk/blog/2022/03/khu-du-lich-binh-chau-1.jpg?tr=dpr-2,w-675",
        providerName: "Nguyễn Hồng Quân",
        description: "Hãy trải nghiệm suối nước nóng cùng chúng tôi"
    },
    {
        name: "Dịch vụ massage trị liệu",
        price: 300000,
        image: "https://ik.imagekit.io/tvlk/blog/2022/03/khu-du-lich-binh-chau-1.jpg?tr=dpr-2,w-675",
        providerName: "Trần Thị Lan",
        description: "Thư giãn và phục hồi sức khỏe với dịch vụ massage của chúng tôi."
    },
    {
        name: "Dịch vụ đưa đón sân bay",
        price: 50000,
        image: "https://lasiestaresorts.com/wp-content/uploads/2022/09/hanoi-are-service-in-air-port_1.jpg",
        providerName: "Lê Văn Đức",
        description: "Dịch vụ đưa đón từ sân bay đến nơi ở của bạn."
    },
    {
        name: "Dịch vụ thuê xe máy",
        price: 100000,
        image: "https://motortrip.vn/wp-content/uploads/2021/06/thue-xe-may-ha-noi-5.jpg",
        providerName: "Nguyễn Thị Hương",
        description: "Khám phá vùng đất mới bằng việc thuê xe máy của chúng tôi."
    },
    {
        name: "Dịch vụ hướng dẫn tham quan",
        price: 150000,
        image: "https://tophomestay.vn/upload/img/2019/12/08/dich_vu_cho_thue_hdv_1575769863869.jpg",
        providerName: "Trịnh Văn Tâm",
        description: "Cùng hướng dẫn viên tham quan và khám phá các điểm du lịch độc đáo."
    },
    {
        name: "Dịch vụ đặt tour du lịch",
        price: 1000000,
        image: "https://vetauthamvinhhalong.com/wp-content/uploads/2023/03/Dich-vu-dat-tour-Du-thuyen-AMBASSADOR-CRUISE.jpg",
        providerName: "Phạm Thị Anh",
        description: "Chọn và đặt tour du lịch theo ý muốn của bạn."
    },
    {
        name: "Dịch vụ ẩm thực đặc biệt",
        price: 250000,
        image: "https://static.vinwonders.com/2022/11/du-lich-am-thuc-2.jpg",
        providerName: "Hoàng Văn Hòa",
        description: "Thưởng thức các món ăn đặc biệt và trải nghiệm ẩm thực độc đáo."
    },
    {
        name: "Dịch vụ cho thuê đồ lặn",
        price: 80000,
        image: "https://cdn1.nhatrangtoday.vn/images/photos/kinh-nghiem-lan-bien-ngam-san-ho-nha-trang-top.jpg",
        providerName: "Ngô Thị Thảo",
        description: "Cho thuê đồ lặn để khám phá đại dương."
    },
    {
        name: "Dịch vụ yoga và thiền",
        price: 150000,
        image: "https://cali.vn/storage/app/media/old/yoga-thien-dinh-1451827842.jpg",
        providerName: "Lê Văn Cường",
        description: "Tham gia lớp học yoga và thiền để thư giãn và tinh thần."
    }
];

const addBuildings = async ()=>{
    for(const building of buildingData){
        await axios.post("http://localhost:8080/api/building",{
            name: building.name,
            position: building.position
        })
    }
}

const addGates = async ()=>{
    for(const gate of gateData){
        await axios.post("http://localhost:8080/api/gate",{
            name: gate.name,
            category: gate.category
        })
    }
}

const addMembers = async()=>{
    for(const member of memberUsers){
        await axios.post("http://localhost:8080/api/register",{
            name: member.name,
            password: "123",
            phone: generatePhoneNumber(),
            status: true,
            gender: member.gender,
            role: "MEMBER",
            gateId: 1
        })
    }
}

const addServices = async()=>{
    for(const service of services){
        await axios.post("http://localhost:8080/api/service",{
            name: service.name,
            price: service.price,
            image: service.image,
            providerName: service.providerName,
            description: service.description,
            phoneContact: generatePhoneNumber()
        })
    }
}

const addGateKeepers = async()=>{
    for (let i = 2; i <= 7; i++) {
        const membersToAdd = gateKeepers.slice((i - 2) * 3, (i - 1) * 3);
        for (const member of membersToAdd) {
            await axios.post("http://localhost:8080/api/register", {
                name: member.name,
                password: "123",
                phone: generatePhoneNumber(),
                status: true,
                gender: member.gender,
                role: "GATEKEEPER",
                gateId: i
            });
        }
    }
}

const addUserToRoom = async()=>{
    for(let j = 1; j <= 10; j++){
        for(let i = (j-1)*4+1; i <= j*4 && i <= memberUsers.length; i++){
            await axios.post(`http://localhost:8080/api/room/addUser?userId=${i}&roomId=${j}`)
        }
    }
}

const addRooms = async()=>{
    let rooms = []
    rooms = generateRoom(rooms)
    for(let i = 1; i <= buildingData.length; i++){
        for(const room of rooms){
            await axios.post("http://localhost:8080/api/room",{
                number: room.number,
                image: room.image,
                buildingId: i
            })
        }
    }
}

const addData = async () => {
    try {
        await addBuildings();
        await addGates();
        await addMembers();
        await addServices();
        await addGateKeepers();
        await addRooms();
        await addUserToRoom();
        console.log("Data added successfully.");
    } catch (error) {
        console.error("Error adding data:", error);
    }
};

// Gọi hàm `addData` để thêm dữ liệu
// addData();