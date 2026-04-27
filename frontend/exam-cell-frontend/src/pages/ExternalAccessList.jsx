// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ExternalAccessList = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/external-auth/externalAccessIDPassword",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("examCellToken")}`,
//                     },
//                 }
//             );

//             setData(res.data.data);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setLoading(false);
//         }
//     };

//     if (loading) return <h3>Loading...</h3>;

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>External Access List</h2>

//             <table border="1" cellPadding="10">
//                 <thead>
//                     <tr>
//                         <th>Subject</th>
//                         <th>Examiner Name</th>
//                         <th>Examiner Email</th>
//                         <th>User ID</th>
//                         <th>Password</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {data.map((item) => (
//                         <tr key={item._id}>
//                             <td>{item.subject}</td>
//                             <td>{item.examinerName}</td>
//                             <td>{item.examinerEmail}</td>
//                             <td>{item.tempUserId}</td>
//                             <td>{item.tempPassword}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ExternalAccessList;





import React, { useEffect, useState } from "react";
import axios from "axios";

const ExternalAccessList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/external-auth/externalAccessIDPassword",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("examCellToken")}`,
                    },
                }
            );

            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    if (loading) return <h3>Loading...</h3>;

    // 🔍 Filter logic (letter by letter)
    const filteredData = data.filter((item) =>
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2>External Access List</h2>

            {/* 🔍 Search Box */}
            <input
                type="text"
                placeholder="Search by Subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: "8px",
                    marginBottom: "10px",
                    width: "300px"
                }}
            />

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Examiner Name</th>
                        <th>Examiner Email</th>
                        <th>User ID</th>
                        <th>Password</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <tr className="text-center border border-black" key={item._id}>
                                <td>{item.subject}</td>
                                <td>{item.examinerName}</td>
                                <td>{item.examinerEmail}</td>
                                <td>{item.tempUserId}</td>
                                <td>{item.tempPassword}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExternalAccessList;