const builtFullAddress = (data) => {
	const address = `${data?.city ?? ''}${
		data.state ? (data.city ? `, ${data.state}` : data.state) : ''
	}${
		data.country
			? data.state || data.city
				? `, ${data.country}`
				: data.country
			: ''
	}`;
	return address;
};

const builtDetailCanvasClient = (data, clickToCall) => {
	//console.log(data);
	const arrayPhones = [];
	if (data?.phone1) {
		arrayPhones.push({
			text: data?.phone1,
			iconClasses: 'ri-phone-line text-primary',
			action: () => clickToCall('phone1'),
		});
	}
	if (data?.phone2) {
		arrayPhones.push({
			text: data?.phone2,
			iconClasses: 'ri-phone-line text-primary',
			action: () => clickToCall('phone2'),
		});
	}
	if (data?.phone3) {
		arrayPhones.push({
			text: data?.phone3,
			iconClasses: 'ri-phone-line text-primary',
			action: () => clickToCall('phone3'),
		});
	}
	if (data?.movil) {
		arrayPhones.push({
			text: data?.movil,
			iconClasses: 'ri-phone-line text-primary',
			action: () => clickToCall('movil'),
		});
	}
	const arrayEmails = [];
	if (data?.email) {
		arrayEmails.push({
			text: data?.email,
			iconClasses: 'ri-mail-line text-danger',
			action: null,
		});
	}
	if (data?.email2) {
		arrayEmails.push({
			text: data?.email2,
			iconClasses: 'ri-mail-line text-danger',
			action: null,
		});
	}

	const header = {
		title: {
			label: '',
			value: `${data?.firstName ?? ''} ${data?.lastName ?? ''}`,
		},
		img: {
			name: data?.firstName ?? 'A',
		},
		body: [
			{
				label: 'Contrato:',
				value: data?.contract ?? 'No disponible',
				extraClassess: 'fw-semibold text-primary',
			},
		],
	};
	const detailClient = {
		id: 'detailClient',
		title: 'Información principal',
		collapse: false,
		body: [
			{
				label: 'Correo',
				value: arrayEmails,
			},
			{
				label: 'Teléfonos',
				value: arrayPhones,
			},
		],
	};
	const acercaCliente = {
		id: 'acercaCliente',
		title: 'Acerca de este cliente',
		collapse: true,
		body: [
			{
				label: 'Dirección',
				value: builtFullAddress(data),
			},
			{
				label: 'Código postal',
				value: data?.postalCode ?? '',
			},
			{
				label: 'Ingreso',
				value: data?.income ?? '',
			},
			{
				label: 'Estado civil',
				value: data?.maritalStatus ?? '',
			},
			{
				label: 'Fecha nacimiento',
				value: data?.fechaNacimiento ?? '',
			},
		],
	};
	const atribucionCliente = {
		id: 'atribucionCliente',
		title: 'Atribución de creación de este cliente',
		collapse: true,
		body: [
			{
				label: 'Usuario que lo creó',
				value: data?.userName ?? '',
			},
			{
				label: 'Call center',
				value: data?.callcenter?.name ?? '',
			},
		],
	};
	// const beneficiosClient = {
	// 	id: 'beneficiosClient',
	// 	title: 'Beneficios de este cliente',
	// 	collapse: true,
	// 	body: [
	// 		{
	// 			label: 'Contrato',
	// 			value: '',
	// 		},
	// 		{
	// 			label: 'Membresía',
	// 			value: '',
	// 		},
	// 		{
	// 			label: 'Certificados',
	// 			value: 'RFCG555',
	// 		},
	// 	],
	// };
	const obj = {
		title: `${data?.firstName ?? ''} ${data?.lastName ?? ''}`,
		header: header,
		items: [detailClient, acercaCliente, atribucionCliente],
		goToView: `/client/${data.id}`,
	};
	return obj;
};

export { builtDetailCanvasClient };
