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

const builtDetailCanvasClient = (data) => {
	//console.log(data);
	const header = {
		title: {
			label: '',
			value: `${data?.firstName ?? ''} ${data?.lastName ?? ''}`,
		},
		img: {
			name: data?.firstName ?? 'A',
		},
		body: [],
	};
	const detailClient = {
		id: 'detailClient',
		title: 'Información principal',
		collapse: false,
		body: [
			{
				label: 'Correo',
				value: [
					{
						text: data?.email ?? 'No disponible',
						iconClasses: 'ri-mail-line text-danger',
						action: null,
					},
				],
			},
			{
				label: 'Teléfonos',
				value: [
					{
						text: data?.phone1 ?? 'No disponible',
						iconClasses: 'ri-phone-line text-success',
						action: null,
					},
					{
						text: data?.phone2 ?? 'No disponible',
						iconClasses: 'ri-phone-line text-success',
						action: null,
					},
					{
						text: data?.phone3 ?? 'No disponible',
						iconClasses: 'ri-phone-line text-success',
						action: null,
					},
					{
						text: data?.movil ?? 'No disponible',
						iconClasses: 'ri-phone-line text-success',
						action: null,
					},
				],
			},
			// {
			// 	label: 'Hora de contactación',
			// 	value: '13:00',
			// 	extraClassess: 'fw-semibold text-primary',
			// },
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
