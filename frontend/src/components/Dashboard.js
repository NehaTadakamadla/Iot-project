import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ApplianceCard from './ApplianceCard';
import ApplianceModal from './ApplianceModal';
import AddApplianceModal from './AddApplianceModal';

function Dashboard() {
    const [appliances, setAppliances] = useState([]);
    const [selectedAppliance, setSelectedAppliance] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchAppliances = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/appliance/user/${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setAppliances(data.appliances || []);
                } else {
                    console.error("Failed to fetch appliances:", data.message);
                }
            } catch (error) {
                console.error("Error fetching appliances:", error);
            }
        };
        fetchAppliances();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        window.location.href = '/';
    };
    

    const handleToggle = async (applianceId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appliance/${applianceId}/toggle`, { method: 'PUT' });
            if (response.ok) {
                const updatedAppliance = await response.json();
                setAppliances(appliances.map(appliance =>
                    appliance._id === applianceId ? { ...appliance, status: updatedAppliance.appliance.status } : appliance
                ));
            } else {
                console.error("Failed to toggle appliance status");
            }
        } catch (error) {
            console.error("Error toggling appliance status:", error);
        }
    };

    const handleDelete = async (applianceId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appliance/${applianceId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setAppliances(appliances.filter(appliance => appliance._id !== applianceId));
            } else {
                console.error("Failed to delete appliance");
            }
        } catch (error) {
            console.error("Error deleting appliance:", error);
        }
    };

    const handleViewDetails = (appliance) => {
        setSelectedAppliance(appliance);
    };

    const handleAddAppliance = (newAppliance) => {
        fetch('http://localhost:5000/api/appliance/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...newAppliance, userId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.appliance) {
                setAppliances([...appliances, data.appliance]);
            }
        })
        .catch(error => console.error('Error adding appliance:', error));
    };

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const closeApplianceModal = () => setSelectedAppliance(null);

    return (
        <div style={styles.container}>
            <Navbar onLogout={handleLogout} />
            <div style={styles.content}>
                <div style={styles.main}>
                    <div style={styles.cardGrid}>
                        {appliances.map(appliance => (
                            <ApplianceCard
                                key={appliance._id}
                                appliance={appliance}
                                onToggle={handleToggle}
                                onClick={() => handleViewDetails(appliance)}
                                onDelete={handleDelete} // Pass delete function
                            />
                        ))}
                        <div style={styles.addCard} onClick={openAddModal}>
                            <h1>+</h1>
                            <p>Add Appliance</p>
                        </div>
                    </div>
                </div>
            </div>
            {selectedAppliance && (
                <ApplianceModal appliance={selectedAppliance} onClose={closeApplianceModal} />
            )}
            {isAddModalOpen && (
                <AddApplianceModal onClose={closeAddModal} onAdd={handleAddAppliance} />
            )}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    },
    content: {
        display: 'flex',
        flex: 1,
        margin: 0,
        paddingTop: '60px',
    },
    main: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        margin: 0,
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        columnGap: '40px',
        rowGap: '20px',
        padding: '20px',
    },
    addCard: {
        backgroundColor: '#f0f4f8',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        height: '150px', 
        width: '150px', 
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        textAlign: 'center',
        margin: '10px',
    },
};


export default Dashboard;
