"use client";

import { type FormEvent, useState } from "react";

import Logo from "@/assets/logo.svg";
import Image from "next/image";

export default function Home() {
	const [value, setValue] = useState("");
	const [currency, setCurrency] = useState("");
	const [newCurrency, setNewCurrency] = useState("");
	const [convertedValue, setConvertedValue] = useState(0);
	const [isValueValid, setIsValueValid] = useState(true);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const response = await fetch(
			`https://economia.awesomeapi.com.br/json/last/${currency}-${newCurrency}`,
		);

		const data = await response.json();

		if (!data[`${currency}${newCurrency}`]) {
			setIsValueValid(false);
			return;
		}

		const isValueValid = value.replace(",", ".").match(/^\d+(\.\d{1,2})?$/);

		if (!isValueValid) {
			setIsValueValid(false);
			return;
		}

		setIsValueValid(true);

		const convertedValue =
			data[`${currency}${newCurrency}`].bid * +value.replace(",", ".");

		setConvertedValue(convertedValue);

		(document.getElementById("form") as HTMLFormElement).reset();
	};

	return (
		<main className="bg-yellow-200 h-screen flex items-center justify-center p-5">
			<section className="flex flex-col items-center justify-center w-full max-w-lg">
				<div className="px-8 py-10 rounded-lg bg-gray-100 shadow-lg w-full">
					<div className="flex flex-col items-center justify-center mb-8">
						<Image src={Logo} alt="Logo do banco" priority width={80} />
						<h1 className="font-bold text-2xl text-gray-800 mt-4">
							ConvertDev Coins
						</h1>
					</div>

					<form
						className="flex flex-col gap-5"
						onSubmit={onSubmit}
						id="form"
					>
						<div className="flex flex-col">
							<label
								htmlFor="value"
								className="font-semibold text-lg text-gray-700"
							>
								Valor
							</label>
							<input
								type="text"
								className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
								placeholder="500"
								onChange={({ target }) => setValue(target.value)}
							/>
							{!isValueValid && (
								<p className="text-red-500 text-sm mt-1">
									Valor inválido. Por favor, insira um valor válido.
								</p>
							)}
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="currency"
								className="font-semibold text-lg text-gray-700"
							>
								De
							</label>
							<select
								name="currency"
								className="outline-none border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
								onChange={(e) => setCurrency(e.target.value)}
								defaultValue={"DEFAULT"}
								required
							>
								<option disabled value="DEFAULT">
									Selecione uma moeda
								</option>
								<option value="USD">Dólar Americano (USD)</option>
								<option value="EUR">Euro (EUR)</option>
								<option value="BRL">Real Brasileiro (BRL)</option>
								<option value="JPY">Iene Japonês (JPY)</option>
								<option value="GBP">Libra Esterlina (GBP)</option>
								<option value="AUD">Dólar Australiano (AUD)</option>
								<option value="CAD">Dólar Canadense (CAD)</option>
								<option value="CHF">Franco Suíço (CHF)</option>
								<option value="CNY">Yuan Chinês (CNY)</option>
								<option value="INR">Rupia Indiana (INR)</option>
							</select>
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="currency"
								className="font-semibold text-lg text-gray-700"
							>
								Para
							</label>
							<select
								name="currency"
								id="currency"
								className="outline-none border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
								onChange={(e) => setNewCurrency(e.target.value)}
								defaultValue={"DEFAULT"}
								required
							>
								<option disabled value="DEFAULT">
									Selecione uma moeda
								</option>
								<option value="USD">Dólar Americano (USD)</option>
								<option value="EUR">Euro (EUR)</option>
								<option value="BRL">Real Brasileiro (BRL)</option>
								<option value="JPY">Iene Japonês (JPY)</option>
								<option value="GBP">Libra Esterlina (GBP)</option>
								<option value="AUD">Dólar Australiano (AUD)</option>
								<option value="CAD">Dólar Canadense (CAD)</option>
								<option value="CHF">Franco Suíço (CHF)</option>
								<option value="CNY">Yuan Chinês (CNY)</option>
								<option value="INR">Rupia Indiana (INR)</option>
							</select>
						</div>

						<input
							type="submit"
							value="Converter"
							className="mt-5 px-5 py-3 rounded-lg bg-yellow-400 text-white font-semibold cursor-pointer hover:bg-yellow-500 duration-200 shadow-md"
						/>
					</form>
					{convertedValue > 0 && (
						<div className="text-center mt-8">
							<h2 className="font-semibold text-lg text-gray-800">
								Valor convertido:{" "}
								<span className="text-yellow-600 font-bold">
									{new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: newCurrency,
									}).format(convertedValue)}
								</span>
							</h2>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
