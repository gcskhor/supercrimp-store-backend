import { formatColour } from "./helperFunctions.mjs";

export default function initColoursController(db) {
	const allColours = async (request, response) => {
		try {
			const colours = await db.Colour.findAll();

			const dataToClient = colours.map((colour) => formatColour(colour));
			response.send(dataToClient);
		} catch (error) {
			console.log(error);
			response.status(404).send("Something went wrong");
		}
	};

	const availableColours = async (request, response) => {
		try {
			const colours = await db.Colour.findAll({
				where: { available: true },
			});

			const dataToClient = colours.map((colour) => formatColour(colour));
			response.send(dataToClient);
		} catch (error) {
			console.log(error);
			response.status(404).send("Something went wrong");
		}
	};

	const add = async (request, response) => {
		try {
			console.log(request.body);
			const { name, code, available } = request.body;
			const newColour = await db.Colour.create({
				name,
				colourCode: code,
				available,
			});

			response.send(formatColour(newColour));
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	const edit = async (request, response) => {
		try {
			console.log(request.body);
			const { id, name, code, available } = request.body;
			const updatedColour = await db.Colour.update(
				{
					name,
					colourCode: code,
					available,
				},
				{ where: { id } }
			);

			response.send(formatColour(updatedColour));
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	const deleteColour = async (request, response) => {
		try {
			const { id } = request.body;

			const colourToDelete = await db.Colour.findOne({
				where: { id },
			});

			await colourToDelete.setProducts([]);
			await colourToDelete.destroy();

			response.send(formatColour(colourToDelete));
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	return {
		allColours,
		availableColours,
		add,
		edit,
		deleteColour,
	};
}
