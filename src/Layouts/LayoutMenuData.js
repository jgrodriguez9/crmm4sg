import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isSecurity, setIsSecurity] = useState(false);
    const [isOperation, setIsOperation] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Security') {
            setIsSecurity(false);
        }
        if (iscurrentState !== 'Operation') {
            setIsOperation(false);
        }
    }, [
        history,
        iscurrentState,
        isSecurity,
        isOperation
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "home",
            label: "Dashboard",
            icon: "ri-dashboard-2-line",
            link: "/dashboard",
        },
        // {
        //     id: "security",
        //     label: "Seguridad",
        //     icon: "ri-shield-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsSecurity(!isSecurity);
        //         setIscurrentState('Security');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isSecurity,
        //     subItems: [
        //         {
        //             id: "bitacora",
        //             label: "Bitácora",
        //             link: "/bitacora",
        //             parentId: "security",
        //         }
        //     ],
        // },
        {
            label: "pages",
            isHeader: true,
        },
        {
            id: "operation",
            label: "Operación",
            icon: "ri-pages-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsOperation(!isOperation);
                setIscurrentState('Operation');
                updateIconSidebar(e);
            },
            stateVariables: isOperation,
            subItems: [
                {
                    id: "agente",
                    label: "Agente",
                    link: "/agent",
                    parentId: "operation",
                },
            ],
        },       
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;